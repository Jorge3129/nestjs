import { DebugLogger } from "../logger/DebugLogger";
import { ModuleInfo } from "../metadata/types/ModuleInfo";
import { Injector } from "../injection/Injector";
import {
  NoControllerInstance,
  NoControllersForModule,
} from "../exceptions/internal-exceptions";
import { RouteConfig, RouterConfig } from "./RouteConfig";
import { ControllerInfo } from "../metadata/types/ControllerInfo";
import { ModuleControllerResolver } from "../metadata/ModuleControllerResolver";
import { RouteHandlerMapper } from "./RouteHandlerMapper";
import { HandlerInfo } from "../metadata/types/HandlerInfo";

type ObjectLiteral = Record<PropertyKey, any>;

export class RouteMapper {
  private logger: DebugLogger = DebugLogger.getInstance();

  public mapForModule(moduleInfo: ModuleInfo): RouterConfig[] {
    const controllerInfos = ModuleControllerResolver.getMultipleMetadata(
      moduleInfo.target
    );

    if (!controllerInfos) throw new NoControllersForModule(moduleInfo.target);

    return this.extractRouters(controllerInfos);
  }

  private extractRouters(controllerInfos: ControllerInfo[]): RouterConfig[] {
    return controllerInfos.map((controllerInfo) => {
      const { path, target } = controllerInfo;

      const token = target.name;

      this.logger.logMessage(RouteMapper, `${token} {${path}}:`);

      const controller = Injector.get(token) as ObjectLiteral;

      if (!controller) throw new NoControllerInstance(controllerInfo.target);

      const { handlers } = controllerInfo;

      const routes = this.extractRoutes({ handlers, controller });

      return { path, routes };
    });
  }

  private extractRoutes(params: {
    handlers: HandlerInfo[];
    controller: ObjectLiteral;
  }): RouteConfig[] {
    const { controller, handlers } = params;

    return handlers.map((handlerInfo): RouteConfig => {
      const { httpMethod, path } = handlerInfo;

      const handler = controller[handlerInfo.propertyKey];

      const newHandler = RouteHandlerMapper.createHandler({
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
}
