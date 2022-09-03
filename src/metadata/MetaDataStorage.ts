import { ControllerInfo } from "../models/ControllerInfo";
import { ModuleInfo } from "../models/ModuleInfo";
import { HandlerInfo } from "../models/HandlerInfo";
import { ParamInfo } from "../models/ParamInfo";
import { ServiceInfo } from "../models/ServiceInfo";

class MetaDataStorage {
  public controllerMap: Map<string, ControllerInfo> = new Map();
  public serviceMap: Map<string, ServiceInfo> = new Map();
  public handlers: HandlerInfo[] = [];
  public methodParams: ParamInfo[] = [];
  public modules: ModuleInfo[] = [];

  getModuleInfo(moduleClass: Function): ModuleInfo | null {
    return this.modules.find((module) => module.target === moduleClass) ?? null;
  }
}

export default new MetaDataStorage();
