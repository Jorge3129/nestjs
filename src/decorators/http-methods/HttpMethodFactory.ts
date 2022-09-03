import metaDataStorage from "../../metadata/MetaDataStorage";
import { HttpMethod } from "../../constants/http-method";

export const HttpMethodFactory =
  (httpMethod: HttpMethod) =>
  (path: string = "/"): MethodDecorator => {
    return <T>(
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void => {
      const params = metaDataStorage.methodParams
        .sort((a, b) => a.index - b.index)
        .concat();

      metaDataStorage.handlers.push({
        descriptor,
        params,
        httpMethod,
        path,
        propertyKey,
      });

      metaDataStorage.methodParams = [];
    };
  };
