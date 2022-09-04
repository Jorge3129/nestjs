import { ControllerInfo } from "../metadata/types/ControllerInfo";
import { HandlerInfo } from "../metadata/types/HandlerInfo";

export interface Logger {
  route(controller: ControllerInfo, handler: HandlerInfo): void;
}
