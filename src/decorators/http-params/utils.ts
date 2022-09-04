import { PipeTransform } from "../../pipes/PipeTransform";
import { ClassConstructor } from "../../models/ClassConstructor";

export type PipeOrConstructor = ClassConstructor<PipeTransform> | PipeTransform;

export const chooseParams = (
  paramOrPipe: string | undefined | PipeOrConstructor,
  pipes: PipeOrConstructor[]
): [string | undefined, PipeOrConstructor[]] => {
  if (!paramOrPipe) return [undefined, []];

  const isParam = typeof paramOrPipe === "string";

  if (isParam) return [paramOrPipe, pipes];

  return [undefined, [paramOrPipe, ...pipes]];
};
