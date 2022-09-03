import { ClassConstructor } from "../models/ClassConstructor";

export class InjectionToken<T extends ClassConstructor> {
  public readonly id: string;

  constructor(id: T | string) {
    this.id = typeof id === "function" ? id.name : id;
  }
}
