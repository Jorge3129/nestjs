import { ParamInfo, ParamType } from "../../metadata/types/ParamInfo";
import { HttpExchange } from "../../models/http-exchange";

type RequestProp = ParamType.PARAM | ParamType.QUERY | ParamType.BODY;

const isRequestProp = (type: ParamType): type is RequestProp => {
  return (
    type === ParamType.PARAM ||
    type === ParamType.QUERY ||
    type === ParamType.BODY
  );
};

const objectOrProp = (object: any, key: string | undefined) =>
  key ? object[key] : object;

const chooseRequestProp = (
  { req }: HttpExchange,
  prop: RequestProp,
  param: string | undefined
) => objectOrProp(req[prop], param);

export const chooseExchangeData = (
  exchange: HttpExchange,
  paramInfo: ParamInfo
) => {
  if (isRequestProp(paramInfo.type))
    return chooseRequestProp(exchange, paramInfo.type, paramInfo.param);
  return exchange[paramInfo.type];
};
