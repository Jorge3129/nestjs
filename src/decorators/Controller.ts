import metaDataStorage from "../metadata/MetaDataStorage";

export const Controller = (path: string = "/"): ClassDecorator => {
  return <T extends Function>(target: T): T | void => {
    const handlers = metaDataStorage.handlers.concat();

    const params = Reflect.getMetadata("design:paramtypes", target);

    metaDataStorage.controllerMap.set(target.name, {
      target: target as any,
      constructorParams: params,
      path,
      handlers,
    });

    metaDataStorage.handlers = [];

    return target;
  };
};
