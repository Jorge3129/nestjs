import { ServiceInfo } from "../../metadata/types/ServiceInfo";

export interface ProviderStrategy {
  createInstance(
    providerInfo: {
      provider: any;
      serviceInfo: ServiceInfo | null;
    },
    moduleClass: Function
  ): any;
}
