export interface INestApplication {
  listen(port: number): Promise<void>;
  enableCors(options?: Object): void;
}
