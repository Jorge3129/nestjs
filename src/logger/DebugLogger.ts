import { ColorCodes } from "./ColorCodes";
import * as path from "path";
import { ControllerInfo } from "../models/ControllerInfo";
import { HandlerInfo } from "../models/HandlerInfo";

export class DebugLogger {
  private constructor() {}

  public route(controller: ControllerInfo, handler: HandlerInfo): void {
    const myPath = path
      .join(controller.path, handler.path)
      .replace(/\\/gi, "/");

    const controllerName = `[${controller.target.name}]`;
    const methodAndPath = `${handler.httpMethod.toUpperCase()} ${myPath}`;

    console.log(
      `${ColorCodes.FgYellow}%s${ColorCodes.Reset} ${ColorCodes.FgGreen}%s${ColorCodes.Reset}`,
      controllerName,
      methodAndPath
    );
  }

  public logMessage(service: Function, message: string): void {
    const serviceName = `[${service.name}]`;

    console.log(
      `${ColorCodes.FgGreen}[Nest] ${ColorCodes.Reset}` +
        `${ColorCodes.FgYellow}%s ${ColorCodes.Reset}` +
        `${ColorCodes.FgGreen}%s${ColorCodes.Reset}`,
      serviceName,
      message
    );
  }

  public logError(error: string, service?: Function): void {
    const serviceName = service ? `[${service.name}] ` : "";

    console.log(
      `${ColorCodes.FgRed}[Nest] %s%s${ColorCodes.Reset}`,
      serviceName,
      error
    );
  }

  private static INSTANCE: DebugLogger;

  public static getInstance(): DebugLogger {
    if (!DebugLogger.INSTANCE) {
      DebugLogger.INSTANCE = new DebugLogger();
    }
    return DebugLogger.INSTANCE;
  }
}
