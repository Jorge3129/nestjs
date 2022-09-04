import { ClassConstructor } from "../models/ClassConstructor";

export type Paramtype = "body" | "query" | "param";

export interface ArgumentMetadata {
  readonly type: Paramtype;

  readonly metatype?: ClassConstructor | undefined;

  readonly data?: string | undefined;
}

export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata?: ArgumentMetadata): R;
}
