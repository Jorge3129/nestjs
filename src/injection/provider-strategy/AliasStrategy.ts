import { ProviderStrategy } from "./ProviderStrategy";
import { AliasProvider } from "../../providers/Provider";
import { InstanceContainer } from "../InstanceContainer";
import { getTokenFromProvider } from "../../providers/provider.utils";
import { Injector } from "../Injector";

export class AliasStrategy implements ProviderStrategy {
  public createInstance(
    providerInfo: {
      provider: AliasProvider;
    },
    moduleClass: Function
  ): any {
    const { provider } = providerInfo;

    const existingClass = provider.useExisting;

    const existingInstance = Injector.get(getTokenFromProvider(existingClass));

    InstanceContainer.set(getTokenFromProvider(provider), existingInstance);
    return existingInstance;
  }
}
