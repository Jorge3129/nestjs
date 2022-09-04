import { NextFunction, Request, RequestHandler, Response } from "express";
import { DebugLogger } from "../logger/DebugLogger";
import { HandlerInfo } from "../metadata/types/HandlerInfo";
import { chooseExchangeData } from "../decorators/http-params/chooseExchangeData";
import { HttpExchange } from "../models/http-exchange";
import { ModuleInfo } from "../metadata/types/ModuleInfo";
import { Injector } from "../injection/Injector";
import {
  NoControllerInstance,
  NoControllersForModule,
} from "../exceptions/internal-exceptions";
import { RouteConfig, RouterConfig } from "./RouteConfig";
import { ControllerInfo } from "../metadata/types/ControllerInfo";
import { ModuleControllerResolver } from "../metadata/ModuleControllerResolver";

type RawHandler = (...args: any[]) => any;

type ObjectLiteral = Record<PropertyKey, any>;

export class RouteMapper {
  private logger: DebugLogger = DebugLogger.getInstance();

  public mapForModule(moduleInfo: ModuleInfo): RouterConfig[] {
    const controllerInfos = ModuleControllerResolver.getMultipleMetadata(
      moduleInfo.target
    );

    if (!controllerInfos) throw new NoControllersForModule(moduleInfo.target);

    const routers: RouterConfig[] = [];

    for (const controllerInfo of controllerInfos) {
      const { path, target } = controllerInfo;

      const token = target.name;

      this.logger.logMessage(RouteMapper, `${token} {${path}}:`);

      const controller = Injector.get(token) as ObjectLiteral;

      if (!controller) throw new NoControllerInstance(controllerInfo.target);

      const routes = this.extractRoutes({ controller, controllerInfo });

      routers.push({ routes, path: controllerInfo.path });
    }

    return routers;
  }

  private extractRoutes(params: {
    controller: ObjectLiteral;
    controllerInfo: ControllerInfo;
  }): RouteConfig[] {
    const { controller, controllerInfo } = params;

    return controllerInfo.handlers.map((handlerInfo): RouteConfig => {
      const { httpMethod, path } = handlerInfo;

      const handler = controller[handlerInfo.propertyKey];

      const newHandler = this.createHandler({
        handler: handler.bind(controller),
        handlerInfo,
      });

      this.logger.logMessage(
        RouteMapper,
        `Mapped {${path}, ${httpMethod.toUpperCase()}} route`
      );

      return { handler: newHandler, httpMethod, path };
    });
  }

  private createHandler(params: {
    handler: RawHandler;
    handlerInfo: HandlerInfo;
  }): RequestHandler {
    const { handler, handlerInfo } = params;

    return async (req: Request, res: Response, next: NextFunction) => {
      const promisifiedHandler = await this.promisify(handler);
      const args = this.resolveParams(handlerInfo, { req, res, next });
      const result = await promisifiedHandler(...args);
      res.send(result);
    };
  }

  private promisify(rawHandler: RawHandler): (...args: any[]) => Promise<any> {
    return (...args: any[]): Promise<any> => {
      const result = rawHandler(...args);
      return result instanceof Promise ? result : Promise.resolve(result);
    };
  }

  private resolveParams(
    handlerInfo: HandlerInfo,
    exchange: HttpExchange
  ): any[] {
    return handlerInfo.params.map((paramInfo) =>
      chooseExchangeData(exchange, paramInfo)
    );
  }
}
