import { ParamType } from "../../models/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Next = HttpParamsFactory(ParamType.QUERY);
