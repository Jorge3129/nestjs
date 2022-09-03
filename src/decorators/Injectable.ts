import metaDataStorage from "../metadata/MetaDataStorage";

export const Injectable = (): ClassDecorator => {
  return <T extends Function>(target: T): T | void => {
    const params = Reflect.getMetadata("design:paramtypes", target);

    metaDataStorage.serviceMap.set(target.name, {
      constructorParams: params ?? [],
      target: target as any,
    });

    return target;
  };
};
