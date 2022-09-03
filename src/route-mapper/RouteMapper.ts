import express, {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { DebugLogger } from "../logger/DebugLogger";
import { HandlerInfo } from "../models/HandlerInfo";
import { ControllerInfo } from "../models/ControllerInfo";
import { chooseExchangeData } from "../decorators/http-params/chooseExchangeData";
import { HttpExchange } from "../models/http-exchange";
import { ModuleInfo } from "../models/ModuleInfo";
import { InstanceLoader } from "../injection/InstanceLoader";
import {
  NoControllerInstance,
  NoControllersForModule,
} from "../exceptions/internal-exceptions";

type RawHandler = (...args: any[]) => any;

type ObjectLiteral = Record<PropertyKey, any>;

export class RouteMapper {
  private logger: DebugLogger = DebugLogger.getInstance();

  public mapForModule(app: Application, moduleInfo: ModuleInfo) {
    const controllers = InstanceLoader.getControllersMetadata(moduleInfo);

    if (!controllers) throw new NoControllersForModule(moduleInfo.target);

    for (const controller of controllers) {
      const router = express.Router();

      const controllerName = controller.target.name;

      const controllerInstance = InstanceLoader.get(
        controllerName
      ) as ObjectLiteral;

      if (!controllerInstance)
        throw new NoControllerInstance(controller.target);

      for (const handler of controller.handlers) {
        const handlerInstance = controllerInstance[handler.propertyKey];

        const newHandler = this.createHandler({
          handlerInstance: handlerInstance.bind(controllerInstance),
          controller,
          handler,
        });

        router[handler.httpMethod](handler.path, newHandler);

        this.logger.route(controller, handler);
      }

      app.use(controller.path, router);
    }
  }

  public createHandler(params: {
    handlerInstance: RawHandler;
    controller: ControllerInfo;
    handler: HandlerInfo;
  }): RequestHandler {
    const { handlerInstance, handler } = params;

    return async (req: Request, res: Response, next: NextFunction) => {
      const promisifiedHandler = await this.promisify(handlerInstance);
      const args = this.resolveParams(handler, { req, res, next });
      const result = await promisifiedHandler(...args);
      res.send(result);
    };
  }

  public promisify(rawHandler: RawHandler): (...args: any[]) => Promise<any> {
    return (...args: any[]): Promise<any> => {
      const result = rawHandler(...args);
      return result instanceof Promise ? result : Promise.resolve(result);
    };
  }

  public resolveParams(handler: HandlerInfo, exchange: HttpExchange): any[] {
    return handler.params.map((paramInfo) =>
      chooseExchangeData(exchange, paramInfo)
    );
  }
}
