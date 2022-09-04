import { RouteParamType } from "../../metadata/types/ParamInfo";
import metaDataStorage from "../../metadata/MetaDataStorage";
import { chooseParams, PipeOrConstructor } from "./utils";

export function Param(
  param: string,
  ...pipes: PipeOrConstructor[]
): ParameterDecorator;

export function Param(...pipes: PipeOrConstructor[]): ParameterDecorator;

export function Param(
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
      type: RouteParamType.PARAM,
      index: parameterIndex,
      methodKey: propertyKey,
      pipes: actualPipes,
      param,
    });
  };
}
