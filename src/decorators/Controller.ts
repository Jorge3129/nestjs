import metaDataStorage from "../metadata/MetaDataStorage";
import { ConstructorParam } from "../metadata/types/ConstructorParam";

export const Controller = (path: string = "/"): ClassDecorator => {
  return <T extends Function>(target: T): T | void => {
    const handlers = metaDataStorage.handlers.concat();
    const injectParams = metaDataStorage.injectParams;

    const paramTypes: Function[] =
      Reflect.getMetadata("design:paramtypes", target) ?? [];

    const constructorParams: ConstructorParam[] = paramTypes.map((type) => ({
      type,
      token: type.name,
    }));

    injectParams.map(({ token, paramIndex }) => {
      constructorParams[paramIndex].token = token;
    });

    metaDataStorage.controllerMap.set(target.name, {
      target: target as any,
      constructorParams,
      path,
      handlers,
    });

    metaDataStorage.handlers = [];
    metaDataStorage.injectParams = [];

    return target;
  };
};
