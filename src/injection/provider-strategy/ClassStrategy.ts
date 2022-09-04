import { ProviderStrategy } from "./ProviderStrategy";
import { ClassConstructor } from "../../models/ClassConstructor";
import { ServiceInfo } from "../../metadata/types/ServiceInfo";
import { InstanceContainer } from "../InstanceContainer";
import { ClassProvider } from "../../providers/Provider";
import { ProviderResolver } from "../ProviderResolver";
import { isClassProvider } from "../../providers/provider.type-guards";
import { getTokenFromProvider } from "../../providers/provider.utils";

export class ClassStrategy implements ProviderStrategy {
  public createInstance(
    providerInfo: {
      provider: ClassConstructor | ClassProvider;
      serviceInfo: ServiceInfo | null;
    },
    moduleClass: Function
  ): any {
    const { provider, serviceInfo } = providerInfo;

    if (!serviceInfo) return;

    const params = serviceInfo.constructorParams;

    if (!params.length) return this.create(provider);

    const dependencies = params.map((param) => {
      const instance = InstanceContainer.get(param.token);
      if (instance) return instance;
      return ProviderResolver.resolveToken(param.token, moduleClass);
    });

    return this.create(provider, dependencies);
  }

  private create(
    provider: ClassConstructor | ClassProvider,
    dependencies: any[] = []
  ): Object {
    const instance = isClassProvider(provider)
      ? new provider.useClass(...dependencies)
      : new provider(...dependencies);

    InstanceContainer.set(getTokenFromProvider(provider), instance);
    return instance;
  }
}
