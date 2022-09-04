import { InjectionToken, Provider } from "../providers/Provider";
import { ModuleProviderResolver } from "../metadata/ModuleProviderResolver";
import { getStringFromToken } from "../providers/getStringFromToken";
import { StrategyManager } from "./provider-strategy/StrategyManager";
import { InstanceContainer } from "./InstanceContainer";
import { getTokenFromProvider } from "../providers/provider.utils";

export class ProviderResolver {
  public static resolve(provider: Provider, moduleClass: Function): any {
    const token = getTokenFromProvider(provider);
    return this.resolveToken(token, moduleClass);
  }

  public static resolveToken(
    token: InjectionToken,
    moduleClass: Function
  ): any {
    const existingInstance = InstanceContainer.get(token);
    if (existingInstance) return existingInstance;

    const providerInfo = ModuleProviderResolver.getSingleMetadata(
      moduleClass,
      getStringFromToken(token)
    );

    if (!providerInfo)
      throw new Error(`Invalid token ${getStringFromToken(token)}`);

    const strategy = StrategyManager.getStrategy(providerInfo.provider);
    return strategy.createInstance(providerInfo, moduleClass);
  }
}
