import metaDataStorage from "./MetaDataStorage";
import { ModuleInfo } from "./types/ModuleInfo";
import { getTokenFromProvider } from "../providers/provider.utils";
import { ProviderInfo } from "./types/ProviderInfo";

export class ModuleProviderResolver {
  public static resolve(moduleInfo: ModuleInfo): void {
    const moduleClass = moduleInfo.target;

    moduleInfo.providers.map((provider) => {
      const serviceInfo =
        metaDataStorage.serviceMap.get(getTokenFromProvider(provider)) ?? null;
      this.addMetadata(moduleClass, { provider, serviceInfo });
    });
  }

  private static addMetadata(
    moduleClass: Function,
    metadata: ProviderInfo
  ): void {
    const moduleInfo = this.getModuleInfo(moduleClass);
    if (!moduleInfo) return;
    const token = getTokenFromProvider(metadata.provider);
    moduleInfo.providerInfos.set(token, metadata);
  }

  public static getSingleMetadata(
    moduleClass: Function,
    token: string
  ): ProviderInfo | null {
    const moduleInfo = this.getModuleInfo(moduleClass);
    if (!moduleInfo) return null;
    return moduleInfo.providerInfos.get(token) ?? null;
  }

  public static getMultipleMetadata(
    moduleClass: Function
  ): ProviderInfo[] | null {
    const moduleInfo = this.getModuleInfo(moduleClass);
    if (!moduleInfo) return null;
    return Array.from(moduleInfo.providerInfos.values());
  }

  private static getModuleInfo(moduleClass: Function) {
    return metaDataStorage.moduleMap.get(moduleClass.name);
  }
}
