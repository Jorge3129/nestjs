import { ParamType } from "../../metadata/types/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Res = HttpParamsFactory(ParamType.RESPONSE);
export const Response = Res;
