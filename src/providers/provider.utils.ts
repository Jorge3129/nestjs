import { Provider } from "./Provider";

export const getTokenFromProvider = (provider: Provider): string => {
  return typeof provider === "function"
    ? provider.name
    : typeof provider.provide === "function"
    ? provider.provide.name
    : provider.provide;
};
