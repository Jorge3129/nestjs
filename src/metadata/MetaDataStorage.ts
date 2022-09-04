import { ControllerInfo } from "./types/ControllerInfo";
import { ModuleInfo } from "./types/ModuleInfo";
import { HandlerInfo } from "./types/HandlerInfo";
import { ParamInfo } from "./types/ParamInfo";
import { ServiceInfo } from "./types/ServiceInfo";
import { InjectInfo } from "./types/InjectInfo";

class MetaDataStorage {
  public moduleMap: Map<string, ModuleInfo> = new Map();
  public controllerMap: Map<string, ControllerInfo> = new Map();
  public serviceMap: Map<string, ServiceInfo> = new Map();
  public handlers: HandlerInfo[] = [];
  public methodParams: ParamInfo[] = [];
  public injectParams: InjectInfo[] = [];

  getModuleInfo(moduleClass: Function): ModuleInfo | null {
    return this.moduleMap.get(moduleClass.name) ?? null;
  }
}

export default new MetaDataStorage();
