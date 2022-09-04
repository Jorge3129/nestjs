import { RouteType } from "../../metadata/types/ParamInfo";
import { HttpRouteFactory } from "./HttpRouteFactory";

export const Req = HttpRouteFactory(RouteType.REQUEST);
export const Request = Req;
