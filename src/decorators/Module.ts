import metaDataStorage from "../metadata/MetaDataStorage";
import { ModuleOptions } from "../metadata/types/ModuleInfo";

export const Module = (options?: ModuleOptions): ClassDecorator => {
  return <T extends Function>(target: T): T | void => {
    const { controllers, providers, imports, exports } = options || {};

    metaDataStorage.moduleMap.set(target.name, {
      target: target as any,
      controllers: controllers ?? [],
      providers: providers ?? [],
      imports: imports ?? [],
      exports: exports ?? [],
      controllerInfos: new Map(),
      providerInfos: new Map(),
    });
  };
};
