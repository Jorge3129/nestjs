import { InjectionToken } from "../providers/Provider";
import { getStringFromToken } from "../providers/getStringFromToken";

export class InstanceContainer {
  private static instanceMap: Map<string, any> = new Map();

  public static get(token: InjectionToken): any {
    const key = getStringFromToken(token);
    return this.instanceMap.get(key) ?? null;
  }

  public static set<T>(token: InjectionToken, value: T): void {
    const key = getStringFromToken(token);
    this.instanceMap.set(key, value);
  }
}
