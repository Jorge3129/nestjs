import { ControllerInfo } from "../models/ControllerInfo";
import { HandlerInfo } from "../models/HandlerInfo";

export interface Logger {
  route(controller: ControllerInfo, handler: HandlerInfo): void;
}
