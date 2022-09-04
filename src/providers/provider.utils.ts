import { Provider } from "./Provider";
import { isClassProvider } from "./provider.type-guards";

export const getTokenFromProvider = (provider: Provider): string => {
  return typeof provider === "function"
    ? provider.name
    : typeof provider.provide === "function"
    ? provider.provide.name
    : provider.provide;
};

export const getInstance = (
  provider: Provider,
  dependencies: any[] = []
): any => {
  if (isClassProvider(provider)) return new provider.useClass(dependencies);
};
