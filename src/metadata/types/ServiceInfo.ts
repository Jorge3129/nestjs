import { ClassConstructor } from "../../models/ClassConstructor";
import { ConstructorParam } from "./ConstructorParam";

export interface ServiceInfo {
  target: ClassConstructor;
  constructorParams: ConstructorParam[];
}
