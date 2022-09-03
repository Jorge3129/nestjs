import { ParamType } from "../../models/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Body = HttpParamsFactory(ParamType.BODY);
