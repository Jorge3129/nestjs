import { ClassConstructor } from "./ClassConstructor";

export interface ServiceInfo {
  target: ClassConstructor;
  constructorParams: Function[];
}
