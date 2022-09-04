import { Provider } from "../../providers/Provider";
import { ServiceInfo } from "./ServiceInfo";

export interface ProviderInfo {
  provider: Provider;
  serviceInfo: ServiceInfo | null;
}
