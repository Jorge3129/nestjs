import { ParamType } from "../../models/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Req = HttpParamsFactory(ParamType.REQUEST);
export const Request = Req;
