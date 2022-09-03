import { ParamType } from "../../models/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Res = HttpParamsFactory(ParamType.RESPONSE);
export const Response = Res;
