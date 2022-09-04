import { ArgumentMetadata, PipeTransform } from "./PipeTransform";
import { HttpException } from "../exceptions/http-exception";
import { HttpStatus } from "../constants/http-status";

export class ParseIntPipe implements PipeTransform<any, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    const parsed = parseInt(value);
    if (Number.isNaN(parsed))
      throw new HttpException(HttpStatus.BAD_REQUEST, "Invalid number format");
    return parsed;
  }
}
