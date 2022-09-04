import metaDataStorage from "../metadata/MetaDataStorage";
import { ConstructorParam } from "../metadata/types/ConstructorParam";

export const Injectable = (): ClassDecorator => {
  return <T extends Function>(target: T): T | void => {
    const paramTypes: Function[] = Reflect.getMetadata(
      "design:paramtypes",
      target
    );

    const injectParams = metaDataStorage.injectParams;

    const constructorParams: ConstructorParam[] = paramTypes.map((type) => ({
      type,
      token: type.name,
    }));

    injectParams.map(({ token, paramIndex }) => {
      constructorParams[paramIndex].token = token;
    });

    metaDataStorage.serviceMap.set(target.name, {
      constructorParams,
      target: target as any,
    });

    metaDataStorage.injectParams = [];

    return target;
  };
};
