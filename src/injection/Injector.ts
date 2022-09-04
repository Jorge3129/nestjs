import { ModuleInfo } from "../metadata/types/ModuleInfo";
import { InstanceLoader } from "./InstanceLoader";

export class Injector {
  private static instanceLoader: InstanceLoader = new InstanceLoader();

  public static get(key: string): Object | null {
    return this.instanceLoader.get(key);
  }

  public static resolveModule(moduleInfo: ModuleInfo) {
    this.instanceLoader.resolveModule(moduleInfo);
  }
}
