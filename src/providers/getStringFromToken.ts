import { InjectionToken } from "./Provider";

export const getStringFromToken = (token: InjectionToken): string => {
  return typeof token === "function" ? token.name : token;
};
