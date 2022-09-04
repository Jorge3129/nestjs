import metaDataStorage from "../metadata/MetaDataStorage";
import { ConstructorParam } from "../metadata/types/ConstructorParam";
import { formatPath } from "../route-mapper/route.utils";

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

    const formattedPath = formatPath(path);

    metaDataStorage.controllerMap.set(target.name, {
      path: formattedPath,
      target: target as any,
      constructorParams,
      handlers,
    });

    metaDataStorage.handlers = [];
    metaDataStorage.injectParams = [];

    return target;
  };
};
