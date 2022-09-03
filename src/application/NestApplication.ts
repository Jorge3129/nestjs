import { Application } from "express";

export class NestApplication {
  constructor(private app: Application) {}

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
}
