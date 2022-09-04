import metaDataStorage from "../../metadata/MetaDataStorage";
import { ParamType } from "../../metadata/types/ParamInfo";

export const HttpParamsFactory =
  (type: ParamType) =>
  (param?: string): ParameterDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol,
      parameterIndex: number
    ): void => {
      metaDataStorage.methodParams.push({
        index: parameterIndex,
        methodKey: propertyKey,
        param,
        type,
      });
    };
  };
