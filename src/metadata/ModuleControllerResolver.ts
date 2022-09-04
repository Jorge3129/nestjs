import { ControllerInfo } from "./types/ControllerInfo";
import metaDataStorage from "./MetaDataStorage";
import { ModuleInfo } from "./types/ModuleInfo";
import { InvalidControllerException } from "../exceptions/internal-exceptions";

export class ModuleControllerResolver {
  public static resolve(moduleInfo: ModuleInfo): void {
    const moduleClass = moduleInfo.target;

    moduleInfo.controllers.map((controller) => {
      const metadata = metaDataStorage.controllerMap.get(controller.name);
      if (!metadata) throw new InvalidControllerException(controller);
      this.addMetadata(moduleClass, metadata);
    });
  }

  private static addMetadata(
    moduleClass: Function,
    metadata: ControllerInfo
  ): void {
    const moduleInfo = this.getModuleInfo(moduleClass);
    if (!moduleInfo) return;
    moduleInfo.controllerInfos.set(metadata.target.name, metadata);
  }

  public static getSingleMetadata(
    moduleClass: Function,
    token: string
  ): ControllerInfo | null {
    const moduleInfo = this.getModuleInfo(moduleClass);
    if (!moduleInfo) return null;
    return moduleInfo.controllerInfos.get(token) ?? null;
  }

  public static getMultipleMetadata(
    moduleClass: Function
  ): ControllerInfo[] | null {
    const moduleInfo = this.getModuleInfo(moduleClass);
    if (!moduleInfo) return null;
    return Array.from(moduleInfo.controllerInfos.values());
  }

  private static getModuleInfo(moduleClass: Function) {
    return metaDataStorage.moduleMap.get(moduleClass.name);
  }
}
