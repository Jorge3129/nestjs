import express from "express";
import { RouteMapper } from "../route-mapper/RouteMapper";
import metaDataStorage from "../metadata/MetaDataStorage";
import { InstanceLoader } from "../injection/InstanceLoader";
import { NestApplication } from "./NestApplication";
import { ModuleNotFoundException } from "../exceptions/internal-exceptions";
import { DebugLogger } from "../logger/DebugLogger";

export class NestFactory {
  private static logger: DebugLogger = DebugLogger.getInstance();

  public static async create(moduleClass: Function): Promise<NestApplication> {
    try {
      const routeMapper = new RouteMapper();

      const moduleInfo = metaDataStorage.getModuleInfo(moduleClass);

      if (!moduleInfo) throw new ModuleNotFoundException(moduleClass);

      InstanceLoader.resolveModule(moduleInfo);

      const app = express();

      app.use(express.json());

      routeMapper.mapForModule(app, moduleInfo);

      return new NestApplication(app);
    } catch (e) {
      const error = e as Error;

      this.logger.logError(error.message, NestFactory);

      return Promise.reject(e);
    }
  }
}
