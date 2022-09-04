import { ClassConstructor } from "../models/ClassConstructor";
import {
  InvalidControllerException,
  NoDependencyException,
} from "../exceptions/internal-exceptions";
import { InstanceContainer } from "./InstanceContainer";
import { ModuleControllerResolver } from "../metadata/ModuleControllerResolver";

export class ControllerResolver {
  public static resolve(
    controller: ClassConstructor,
    moduleClass: Function
  ): Object {
    const controllerName = controller.name;

    const metadata = ModuleControllerResolver.getSingleMetadata(
      moduleClass,
      controllerName
    );

    if (!metadata) throw new InvalidControllerException(controller);

    const dependencies = metadata.constructorParams.map((param) => {
      const instance = InstanceContainer.get(param.token);
      if (!instance) throw new NoDependencyException(controller, param.token);
      return instance;
    });

    return this.createInstance(controller, dependencies);
  }

  private static createInstance(
    Constructor: ClassConstructor,
    dependencies: Object[] = []
  ): any {
    const instance = new Constructor(...dependencies);
    InstanceContainer.set(Constructor.name, instance);
    return instance;
  }
}
