import { ProviderInfo } from "../../metadata/types/ProviderInfo";
import { ClassConstructor } from "../../models/ClassConstructor";
import { AliasProvider, Provider } from "../../providers/Provider";
import {
  isAliasProvider,
  isClassProvider,
  isPlainProvider,
  isValueProvider,
} from "../../providers/provider.type-guards";
import { ClassStrategy } from "./ClassStrategy";
import { ProviderStrategy } from "./ProviderStrategy";
import { ValueStrategy } from "./ValueStrategy";
import { AliasStrategy } from "./AliasStrategy";

export class StrategyManager {
  private static classStrategy: ClassStrategy = new ClassStrategy();
  private static valueStrategy: ValueStrategy = new ValueStrategy();
  private static aliasStrategy: AliasStrategy = new AliasStrategy();

  public static getStrategy(provider: Provider): ProviderStrategy {
    switch (true) {
      case isClassProvider(provider) || isPlainProvider(provider):
        return this.classStrategy;
      case isValueProvider(provider):
        return this.valueStrategy;
      case isAliasProvider(provider):
        return this.aliasStrategy;
    }
    throw new Error("Incorrect provider");
  }
}
