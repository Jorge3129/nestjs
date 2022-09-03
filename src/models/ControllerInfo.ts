import { HandlerInfo } from "./HandlerInfo";
import { ClassConstructor } from "./ClassConstructor";

export interface ControllerInfo {
  path: string;
  handlers: HandlerInfo[];
  target: ClassConstructor;
  constructorParams: Function[];
}
