import { ProviderStrategy } from "./ProviderStrategy";
import { ValueProvider } from "../../providers/Provider";
import { InstanceContainer } from "../InstanceContainer";
import { getTokenFromProvider } from "../../providers/provider.utils";

export class ValueStrategy implements ProviderStrategy {
  public createInstance(
    providerInfo: {
      provider: ValueProvider;
    },
    moduleClass: Function
  ): any {
    const { provider } = providerInfo;

    const value = provider.useValue;

    InstanceContainer.set(getTokenFromProvider(provider), value);
    return value;
  }
}
