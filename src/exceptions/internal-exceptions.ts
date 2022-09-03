export class NoDependencyForControllerException extends Error {
  constructor(controller: Function, dependency: Function) {
    const message = `Cannot resolve dependency ${dependency.name} of  controller ${controller.name}`;
    super(message);
  }
}

export class ProviderNotFoundException extends Error {
  constructor(provider: Function) {
    const message = `Provider ${provider.name} not found`;
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

export class ControllerNotFoundException extends Error {
  constructor(controller: Function) {
    const message = `Controller ${controller.name} not found`;
    super(message);
  }
}
