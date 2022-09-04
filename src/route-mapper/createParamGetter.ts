import {
  isRouteParamInfo,
  ParamInfo,
  RouteParamType,
} from "../metadata/types/ParamInfo";
import { HttpExchange } from "../models/http-exchange";

const objectOrProp = (object: any, key: string | undefined) =>
  key ? object[key] : object;

const chooseRequestProp = (
  { req }: HttpExchange,
  prop: RouteParamType,
  param: string | undefined
) => objectOrProp(req[prop], param);

export const createParamGetter = (paramInfo: ParamInfo) => {
  return (exchange: HttpExchange) => {
    if (isRouteParamInfo(paramInfo)) {
      const value = chooseRequestProp(
        exchange,
        paramInfo.type,
        paramInfo.param
      );

      return paramInfo.pipes.reduce((result, pipe) => {
        return typeof pipe === "function"
          ? new pipe().transform(result)
          : pipe.transform(result);
      }, value as any);
    }
    return exchange[paramInfo.type];
  };
};
