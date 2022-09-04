import { InjectionToken, Provider } from "../providers/Provider";
import { getTokenFromProvider } from "../providers/provider.utils";
import { getStringFromToken } from "../providers/getStringFromToken";

export class NoDependencyException extends Error {
  constructor(controller: Function, token: InjectionToken) {
    const name = getStringFromToken(token);
    const message = `Cannot resolve dependency ${name} of  controller ${controller.name}`;
    super(message);
  }
}

export class ProviderNotFoundException extends Error {
  constructor(provider: Provider) {
    const message = `Provider ${getTokenFromProvider(provider)} not found`;
    super(message);
  }
}

export class NoControllersForModule extends Error {
  constructor(module: Function) {
    const message = `No controllers found for module ${module.name}`;
    super(message);
  }
}

export class NoControllerInstance extends Error {
  constructor(controller: Function) {
    const message = `No instance found for controller ${controller.name}`;
    super(message);
  }
}

export class ModuleNotFoundException extends Error {
  constructor(module: Function) {
    const message = `Module ${module.name} not found`;
    super(message);
  }
}

export class InvalidControllerException extends Error {
  constructor(controller: Function) {
    const message = `An invalid controller ${controller.name} has been detected. Perhaps, one of your controllers is missing @Controller() decorator.`;
    super(message);
  }
}
