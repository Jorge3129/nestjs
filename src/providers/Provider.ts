import { ClassConstructor } from "../models/ClassConstructor";

export type InjectionToken = string | Function | ClassConstructor;

export type Provider =
  | ClassConstructor
  | ClassProvider
  | FactoryProvider
  | ValueProvider
  | AliasProvider;

export interface ClassProvider<T = any> {
  provide: InjectionToken;
  useClass: ClassConstructor<T>;
}

export interface FactoryProvider<T = any> {
  provide: InjectionToken;
  useFactory: (...args: any[]) => T;
}

export interface ValueProvider<T = any> {
  provide: InjectionToken;
  useValue: T;
}

export interface AliasProvider<T = any> {
  provide: InjectionToken;
  useExisting: any;
}
