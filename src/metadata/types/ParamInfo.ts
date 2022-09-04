import { PipeOrConstructor } from "../../decorators/http-params/utils";

export enum RouteParamType {
  BODY = "body",
  PARAM = "params",
  QUERY = "query",
}

export enum RouteType {
  REQUEST = "req",
  RESPONSE = "res",
  NEXT = "next",
}

interface BasicInfo {
  index: number;
  methodKey: string | symbol;
}

export type ParamType = RouteParamType | RouteType;

interface RouteParamInfo extends BasicInfo {
  type: RouteParamType;
  param: string | undefined;
  pipes: PipeOrConstructor[];
}

interface RouteInfo extends BasicInfo {
  type: RouteType;
}

export type ParamInfo = RouteParamInfo | RouteInfo;

export const isRouteParamInfo = (info: ParamInfo): info is RouteParamInfo => {
  const { type } = info;

  return (
    type === RouteParamType.PARAM ||
    type === RouteParamType.QUERY ||
    type === RouteParamType.BODY
  );
};
