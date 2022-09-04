import { RouteMapper } from "../route-mapper/RouteMapper";
import metaDataStorage from "../metadata/MetaDataStorage";
import { Injector } from "../injection/Injector";
import { NestApplication } from "./NestApplication";
import { ModuleNotFoundException } from "../exceptions/internal-exceptions";
import { DebugLogger } from "../logger/DebugLogger";

export class NestFactory {
  private static logger: DebugLogger = DebugLogger.getInstance();

  public static async create(moduleClass: Function): Promise<NestApplication> {
    this.logger.logMessage(NestFactory, "Starting Nest application...");
    try {
      const routeMapper = new RouteMapper();

      const moduleInfo = metaDataStorage.getModuleInfo(moduleClass);

      if (!moduleInfo) throw new ModuleNotFoundException(moduleClass);

      Injector.resolveModule(moduleInfo);

      const app = new NestApplication();

      const routers = routeMapper.mapForModule(moduleInfo);
      app.registerRouters(routers);

      return app;
    } catch (e) {
      const error = e as Error;

      this.logger.logError(NestFactory, error.message);

      return Promise.reject(e);
    }
  }
}
