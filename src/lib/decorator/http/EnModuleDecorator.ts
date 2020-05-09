import {AbstractClassDecorator, BaseConstructor, InstanceReflect, MethodReflect} from "@easy-node/reflect";
import {InjectMap} from "@easy-node/reflect/dist/lib/InjectMap";
import {Application} from "../../Application";

export class EnModuleDecorator extends  AbstractClassDecorator {
  constructor(
    public path: string
  ) {
    super();
  }

  public onNewInstance<R extends Function>(methodReflect: MethodReflect<R>): InjectMap<BaseConstructor, InstanceReflect<any>> {
    const injectMap = new InjectMap<BaseConstructor, InstanceReflect<any>>();
    return injectMap;
  }
}