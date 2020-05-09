import {ClassReflect, InstanceReflect, reflectClass} from "@easy-node/reflect";

export abstract class Application {
  static run<T extends ApplicationConstructor>(App: T): InstanceType<T> {
    const classReflect: ClassReflect<T> = reflectClass(App);
    const instanceReflect: InstanceReflect<Application> = classReflect.newInstance((classReflect, parameters) => {
      return [];
    });
    return instanceReflect.metadata as InstanceType<T>;
  }
}

export interface ApplicationConstructor {
  new (path: string): Application;
}
