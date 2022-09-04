import express, { Application } from "express";
import { RouterConfig } from "../route-mapper/RouteConfig";
import { INestApplication } from "./INestApplication";

export class NestApplication implements INestApplication {
  private app: Application;

  constructor() {
    const app = express();
    app.use(express.json());
    this.app = app;
  }

  public listen(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.app.listen(port, () => {
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  enableCors(options?: Object): void {}

  public registerRouters(routerConfigs: RouterConfig[]): void {
    for (const routerConfig of routerConfigs) {
      const { path, routes } = routerConfig;

      const router = express.Router();

      for (const routeConfig of routes) {
        const { httpMethod, path, handler } = routeConfig;

        router[httpMethod](path, handler);
      }

      this.app.use(path, router);
    }
  }
}
