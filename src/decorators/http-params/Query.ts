import { ParamType } from "../../models/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Query = HttpParamsFactory(ParamType.QUERY);
