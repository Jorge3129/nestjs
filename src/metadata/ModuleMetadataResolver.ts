import { ModuleInfo } from "./types/ModuleInfo";
import { ModuleProviderResolver } from "./ModuleProviderResolver";
import { ModuleControllerResolver } from "./ModuleControllerResolver";

export class ModuleMetadataResolver {
  public static resolveModule(moduleInfo: ModuleInfo): void {
    ModuleProviderResolver.resolve(moduleInfo);
    ModuleControllerResolver.resolve(moduleInfo);
  }
}
