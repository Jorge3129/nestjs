import { ProviderStrategy } from "./ProviderStrategy";
import { AliasProvider } from "../../providers/Provider";
import { InstanceContainer } from "../InstanceContainer";
import { getTokenFromProvider } from "../../providers/provider.utils";

export class AliasStrategy implements ProviderStrategy {
  public createInstance(
    providerInfo: {
      provider: AliasProvider;
    },
    moduleClass: Function
  ): any {
    const { provider } = providerInfo;

    const existingClass = provider.useExisting;

    const existingInstance = InstanceContainer.get(
      getTokenFromProvider(existingClass)
    );

    InstanceContainer.set(getTokenFromProvider(provider), existingInstance);
    return existingInstance;
  }
}
