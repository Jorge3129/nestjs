import { HandlerInfo } from "../metadata/types/HandlerInfo";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { createParamGetter } from "./createParamGetter";
import { HttpExchange } from "../models/http-exchange";
import { lastValueFrom, Observable } from "rxjs";

export type RawHandler = (...args: any[]) => any;

export type ParamGetter = (exchange: HttpExchange) => any;

export class RouteHandlerMapper {
  public static createHandler(params: {
    handler: RawHandler;
    handlerInfo: HandlerInfo;
  }): RequestHandler {
    const { handler, handlerInfo } = params;

    const paramGetters: ParamGetter[] = this.resolveParams(handlerInfo);

    return async (req: Request, res: Response, next: NextFunction) => {
      const promisifiedHandler = await this.promisify(handler);
      const args = paramGetters.map((get) => get({ res, req, next }));
      const result = await promisifiedHandler(...args);
      res.send(result);
    };
  }

  private static promisify(
    rawHandler: RawHandler
  ): (...args: any[]) => Promise<any> {
    return (...args: any[]): Promise<any> => {
      const result = rawHandler(...args);

      if (result instanceof Observable) return lastValueFrom(result);
      if (result instanceof Promise) return result;
      return Promise.resolve(result);
    };
  }

  private static resolveParams(handlerInfo: HandlerInfo): ParamGetter[] {
    return handlerInfo.params.map(createParamGetter);
  }
}
