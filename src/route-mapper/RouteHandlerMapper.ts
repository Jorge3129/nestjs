import { HandlerInfo } from "../metadata/types/HandlerInfo";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { createParamGetter } from "./createParamGetter";
import { HttpExchange } from "../models/http-exchange";
import { lastValueFrom, Observable } from "rxjs";
import { globalExceptionHandler } from "../exceptions/global-exception-handler";

export type RawHandler = (...args: any[]) => any;

export type ParamGetter = (exchange: HttpExchange) => any;

export class RouteHandlerMapper {
  public static createHandler(params: {
    handler: RawHandler;
    handlerInfo: HandlerInfo;
  }): RequestHandler {
    const { handler, handlerInfo } = params;

    const paramGetters: ParamGetter[] = this.resolveParams(handlerInfo);

    const promisifiedHandler = this.promisify(handler);

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const args = paramGetters.map((get) => get({ res, req, next }));
        const result = await promisifiedHandler(...args);
        res.send(result);
      } catch (e: any) {
        globalExceptionHandler(e, req, res);
      }
    };
  }

  private static promisify(
    rawHandler: RawHandler
  ): (...args: any[]) => Promise<any> {
    return (...args: any[]): Promise<any> => {
      try {
        const result = rawHandler(...args);

        if (result instanceof Observable) return lastValueFrom(result);
        if (result instanceof Promise) return result;
        return Promise.resolve(result);
      } catch (e) {
        throw e;
      }
    };
  }

  private static resolveParams(handlerInfo: HandlerInfo): ParamGetter[] {
    return handlerInfo.params.map(createParamGetter);
  }
}
