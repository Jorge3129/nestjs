export enum ParamType {
  BODY = "body",
  PARAM = "params",
  QUERY = "query",
  REQUEST = "req",
  RESPONSE = "res",
  NEXT = "next",
}

export interface ParamInfo {
  type: ParamType;
  index: number;
  methodKey: string | symbol;
  param: string | undefined;
}
