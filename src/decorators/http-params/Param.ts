import { ParamType } from "../../models/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Param = HttpParamsFactory(ParamType.PARAM);
