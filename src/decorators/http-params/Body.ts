import { ParamType } from "../../metadata/types/ParamInfo";
import { HttpParamsFactory } from "./HttpParamsFactory";

export const Body = HttpParamsFactory(ParamType.BODY);
