import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import { RouterConfig } from "../route-mapper/RouteConfig";
import { INestApplication } from "./INestApplication";

export class NestApplication implements INestApplication {
  private app: Application;
  private exceptionHandler: ErrorRequestHandler;

  constructor() {
    const app = express();
    app.use(express.json());
    this.app = app;
  }

  public listen(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.app.use(this.exceptionHandler);
        this.app.listen(port, () => {
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public enableCors(options?: Object): void {}

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

  public registerExceptionHandler(handler: ErrorRequestHandler): void {
    this.exceptionHandler = handler;
  }
}
