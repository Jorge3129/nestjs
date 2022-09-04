import metaDataStorage from "../../metadata/MetaDataStorage";
import { HttpMethod } from "../../constants/http-method";
import { formatPath } from "../../route-mapper/route.utils";

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

      const formattedPath = formatPath(path);

      metaDataStorage.handlers.push({
        path: formattedPath,
        descriptor,
        params,
        httpMethod,
        propertyKey,
      });

      metaDataStorage.methodParams = [];
    };
  };
