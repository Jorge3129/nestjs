import metaDataStorage from "../metadata/MetaDataStorage";
import { InjectionToken } from "../providers/Provider";

export const Inject = (token: InjectionToken): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    paramIndex: number
  ): void => {
    metaDataStorage.injectParams.push({
      token,
      paramIndex,
    });
  };
};
