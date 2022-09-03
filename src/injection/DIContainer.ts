import { ClassConstructor } from "../models/ClassConstructor";
import metaDataStorage from "../metadata/MetaDataStorage";
import { DebugLogger } from "../logger/DebugLogger";
import { ModuleInfo } from "../models/ModuleInfo";
import { ControllerInfo } from "../models/ControllerInfo";
import { InstanceLoader } from "./InstanceLoader";
import {
  ControllerNotFoundException,
  NoDependencyForControllerException,
  ProviderNotFoundException,
} from "../exceptions/internal-exceptions";

export class DiContainer {
  private logger: DebugLogger = DebugLogger.getInstance();
  private controllersMetadata: Map<string, ControllerInfo[]> = new Map();
  private instanceMap: Map<string, Object> = new Map();

  public get(key: string): Object | null {
    return this.instanceMap.get(key) ?? null;
  }

  public resolveModule(moduleInfo: ModuleInfo) {
    this.resolveProviders(moduleInfo);
    this.resolveControllers(moduleInfo);
  }

  public getControllersMetadata(
    moduleInfo: ModuleInfo
  ): ControllerInfo[] | null {
    return this.controllersMetadata.get(moduleInfo.target.name) ?? null;
  }

  private resolveProviders(moduleInfo: ModuleInfo) {
    moduleInfo.providers.map((provider) =>
      this.resolveProvider(provider as any)
    );
  }

  private resolveControllers(moduleInfo: ModuleInfo) {
    const moduleName = moduleInfo.target.name;

    moduleInfo.controllers.map((controllerClass) =>
      this.resolveController(controllerClass as any, moduleName)
    );
  }

  private resolveController(
    controller: ClassConstructor,
    moduleName: string
  ): Object {
    const controllerName = controller.name;
    // console.log(`Starting for controller ${controllerName}`);

    const metadata = metaDataStorage.controllerMap.get(controllerName);

    if (!metadata) throw new ControllerNotFoundException(controller);

    this.addControllersMetadata(moduleName, metadata);

    const dependencies = metadata.constructorParams.map((dependency) => {
      const instance = this.instanceMap.get(dependency.name);

      if (!instance)
        throw new NoDependencyForControllerException(controller, dependency);

      return instance;
    });

    this.logger.logMessage(
      InstanceLoader,
      `Resolved dependecies of ${controller.name}`
    );

    return this.createInstance(controller, dependencies);
  }

  private addControllersMetadata(
    moduleName: string,
    metadata: ControllerInfo
  ): void {
    const controllersMetadata = this.controllersMetadata.get(moduleName) ?? [];

    this.controllersMetadata.set(moduleName, [
      ...controllersMetadata,
      metadata,
    ]);
  }

  private resolveProvider(provider: ClassConstructor): Object {
    const name = provider.name;

    const existingInstance = this.instanceMap.get(name);
    if (existingInstance) return existingInstance;

    // console.log(`Start for provider ${name}`);

    const serviceMetadata = metaDataStorage.serviceMap.get(name);

    if (!serviceMetadata) throw new ProviderNotFoundException(provider);

    const dependencies = serviceMetadata.constructorParams;

    if (!dependencies.length) return this.createInstance(provider);

    const instances = dependencies.map((dependency) => {
      // console.log(`Finding dep ${dependency.name} for provider ${name}`);
      const instance = this.instanceMap.get(dependency.name);
      if (instance) return instance;
      return this.resolveProvider(dependency as any);
    });

    const serviceInstance = this.createInstance(provider, instances);

    this.logger.logMessage(
      InstanceLoader,
      `Resolved dependecies of ${provider.name}`
    );

    return serviceInstance;
  }

  private createInstance(
    Constructor: ClassConstructor,
    dependencies: Object[] = []
  ): Object {
    const instance = new Constructor(...dependencies);
    this.instanceMap.set(Constructor.name, instance);
    return instance;
  }
}
