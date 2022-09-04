import metaDataStorage from "../../metadata/MetaDataStorage";
import { RouteType } from "../../metadata/types/ParamInfo";

export const HttpRouteFactory = (type: RouteType) => (): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): void => {
    metaDataStorage.methodParams.push({
      index: parameterIndex,
      methodKey: propertyKey,
      type,
    });
  };
};
