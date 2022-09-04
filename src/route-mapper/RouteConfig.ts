import { RequestHandler } from "express";
import { HttpMethod } from "../constants/http-method";

export interface RouteConfig {
  path: string;
  httpMethod: HttpMethod;
  handler: RequestHandler;
}

export interface RouterConfig {
  path: string;
  routes: RouteConfig[];
}
