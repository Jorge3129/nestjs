import { Color, ColorCodes } from "./ColorCodes";
import * as path from "path";
import { ControllerInfo } from "../metadata/types/ControllerInfo";
import { HandlerInfo } from "../metadata/types/HandlerInfo";
import dayjs from "dayjs";

const { Green, Red, Yellow, Reset } = ColorCodes;

enum MessageType {
  LOG = "LOG",
  ERROR = "ERROR",
}

export class DebugLogger {
  private constructor() {}

  public route(controller: ControllerInfo, handler: HandlerInfo): void {
    const myPath = path
      .join(controller.path, handler.path)
      .replace(/\\/gi, "/");

    const controllerName = `[${controller.target.name}]`;
    const methodAndPath = `${handler.httpMethod.toUpperCase()} ${myPath}`;

    console.log(
      `${ColorCodes.Yellow}%s${ColorCodes.Reset} ${ColorCodes.Green}%s${ColorCodes.Reset}`,
      controllerName,
      methodAndPath
    );
  }

  private createMessage(params: {
    service: Function;
    message: string;
    type: MessageType;
  }) {
    const { service, message, type } = params;

    const [color, typeLog] =
      type === MessageType.ERROR ? [Red, "   ERROR"] : [Green, "     LOG"];
    const pid = process.pid;
    const time = dayjs().format("DD:MM:YYYY, HH:mm:ss");

    const prefix = `${color}[Nest] ${pid}  - ${Reset}${time}`;

    const logType = `${color}${typeLog}`;
    const serviceName = `${Yellow} [${service.name}] ${color}`;

    return `${prefix}${logType}${serviceName}${message}${Reset}`;
  }

  public logMessage(service: Function, message: string): void {
    console.log(
      this.createMessage({
        service,
        message,
        type: MessageType.LOG,
      })
    );
  }

  public logError(service: Function, message: string): void {
    console.log(
      this.createMessage({
        service,
        message,
        type: MessageType.ERROR,
      })
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
