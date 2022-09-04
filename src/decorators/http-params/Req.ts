import { ParamType } from "../../metadata/types/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Req = HttpParamsFactory(ParamType.REQUEST);
export const Request = Req;
