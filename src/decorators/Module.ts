import metaDataStorage from "../metadata/MetaDataStorage";
import { ModuleOptions } from "../models/ModuleInfo";

export const Module = (options?: ModuleOptions): ClassDecorator => {
  return <T extends Function>(target: T): T | void => {
    const { controllers, providers } = options || {};
    metaDataStorage.modules.push({
      target: target as any,
      controllers: controllers ?? [],
      providers: providers ?? [],
    });
  };
};
