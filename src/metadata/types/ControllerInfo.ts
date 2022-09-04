import { HandlerInfo } from "./HandlerInfo";
import { ClassConstructor } from "../../models/ClassConstructor";
import { ConstructorParam } from "./ConstructorParam";

export interface ControllerInfo {
  path: string;
  handlers: HandlerInfo[];
  target: ClassConstructor;
  constructorParams: ConstructorParam[];
}
