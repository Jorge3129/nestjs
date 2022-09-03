import {HttpMethod} from "../constants/http-method";
import {ParamInfo} from "./ParamInfo";

export interface HandlerInfo {
   httpMethod: HttpMethod
   path: string;
   propertyKey: string | symbol,
   params: ParamInfo[]
   descriptor: TypedPropertyDescriptor<any>
}
