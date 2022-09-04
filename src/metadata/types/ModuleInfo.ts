import { ClassConstructor } from "../../models/ClassConstructor";
import { ControllerInfo } from "./ControllerInfo";
import { ServiceInfo } from "./ServiceInfo";
import { Provider } from "../../providers/Provider";
import { ProviderInfo } from "./ProviderInfo";

export interface ModuleOptions {
  controllers?: ClassConstructor[];
  providers?: Provider[];
  imports?: Function[];
  exports?: Provider[];
}

export interface ModuleInfo extends Required<ModuleOptions> {
  target: ClassConstructor;
  providerInfos: Map<string, ProviderInfo>;
  controllerInfos: Map<string, ControllerInfo>;
}
