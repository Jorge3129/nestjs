import {
  AliasProvider,
  ClassProvider,
  FactoryProvider,
  Provider,
  ValueProvider,
} from "./Provider";
import { ClassConstructor } from "../models/ClassConstructor";

export const isProvider = (
  object: any
): object is Exclude<Provider, ClassConstructor> => {
  return typeof object === "object" && "provide" in object;
};

export const isClassProvider = (
  provider: Provider
): provider is ClassProvider => {
  return "useClass" in provider;
};

export const isValueProvider = (
  provider: Provider
): provider is ValueProvider => {
  return "useValue" in provider;
};

export const isAliasProvider = (
  provider: Provider
): provider is AliasProvider => {
  return "useExisting" in provider;
};

export const isFactoryProvider = (
  provider: Provider
): provider is FactoryProvider => {
  return "useFactory" in provider;
};

export const isPlainProvider = (
  provider: Provider
): provider is ClassConstructor => {
  return typeof provider === "function";
};
