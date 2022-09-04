import { ArgumentMetadata, PipeTransform } from "./PipeTransform";

export class ParseIntPipe implements PipeTransform<any, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    const parsed = parseInt(value);
    if (Number.isNaN(parsed)) throw new Error("Invalid number format");
    return parsed;
  }
}
