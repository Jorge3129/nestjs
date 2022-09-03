import { ClassConstructor } from "./ClassConstructor";

export interface ModuleOptions {
  controllers?: Function[];
  providers?: Function[];
}

export interface ModuleInfo extends Required<ModuleOptions> {
  target: ClassConstructor;
}
