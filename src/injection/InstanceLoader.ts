import { ModuleInfo } from "../models/ModuleInfo";
import { ControllerInfo } from "../models/ControllerInfo";
import { DiContainer } from "./DIContainer";

export class InstanceLoader {
  private static container: DiContainer = new DiContainer();

  public static get(key: string): Object | null {
    return this.container.get(key);
  }

  public static resolveModule(moduleInfo: ModuleInfo) {
    this.container.resolveModule(moduleInfo);
  }

  public static getControllersMetadata(
    moduleInfo: ModuleInfo
  ): ControllerInfo[] | null {
    return this.container.getControllersMetadata(moduleInfo);
  }
}
