import { DebugLogger } from "../logger/DebugLogger";
import { ModuleInfo } from "../metadata/types/ModuleInfo";
import { ModuleMetadataResolver } from "../metadata/ModuleMetadataResolver";
import { getTokenFromProvider } from "../providers/provider.utils";
import { InstanceContainer } from "./InstanceContainer";
import { ControllerResolver } from "./ControllerResolver";
import { ProviderResolver } from "./ProviderResolver";

const resolvedMessage = (name: string) => `Resolved dependecies of ${name}`;

export class InstanceLoader {
  private logger: DebugLogger = DebugLogger.getInstance();

  public get(key: string): any | null {
    return InstanceContainer.get(key);
  }

  public resolveModule(moduleInfo: ModuleInfo) {
    ModuleMetadataResolver.resolveModule(moduleInfo);
    this.resolveProviders(moduleInfo);
    this.resolveControllers(moduleInfo);

    const moduleName = moduleInfo.target.name;
    const message = `${moduleName} dependencies initialized`;
    this.logger.logMessage(InstanceLoader, message);
  }

  private resolveProviders(moduleInfo: ModuleInfo) {
    moduleInfo.providers.map((provider) => {
      ProviderResolver.resolve(provider, moduleInfo.target);
    });
  }

  private resolveControllers(moduleInfo: ModuleInfo) {
    const moduleClass = moduleInfo.target;
    moduleInfo.controllers.map((controller) => {
      ControllerResolver.resolve(controller, moduleClass);
    });
  }
}
