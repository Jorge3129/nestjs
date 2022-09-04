import { RouteType } from "../../metadata/types/ParamInfo";
import { HttpRouteFactory } from "./HttpRouteFactory";

export const Res = HttpRouteFactory(RouteType.RESPONSE);
export const Response = Res;
