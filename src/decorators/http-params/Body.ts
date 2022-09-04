import { RouteParamType } from "../../metadata/types/ParamInfo";
import metaDataStorage from "../../metadata/MetaDataStorage";
import { chooseParams, PipeOrConstructor } from "./utils";

export function Body(
  param: string,
  ...pipes: PipeOrConstructor[]
): ParameterDecorator;

export function Body(...pipes: PipeOrConstructor[]): ParameterDecorator;

export function Body(
  paramOrPipe?: string | PipeOrConstructor,
  ...pipes: PipeOrConstructor[]
): ParameterDecorator {
  const [param, actualPipes] = chooseParams(paramOrPipe, pipes);

  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): void => {
    metaDataStorage.methodParams.push({
      type: RouteParamType.BODY,
      index: parameterIndex,
      methodKey: propertyKey,
      pipes: actualPipes,
      param,
    });
  };
}
