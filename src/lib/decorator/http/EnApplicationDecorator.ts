import {AbstractClassDecorator, BaseConstructor, InstanceReflect, MethodReflect} from "@easy-node/reflect";
import {Application} from "../../Application";
import {InjectMap} from "@easy-node/reflect/dist/lib/InjectMap";

export class EnApplicationDecorator<T extends BaseConstructor> extends AbstractClassDecorator {
  constructor(
    public modules: T[]
  ) {super();}

  public onNewInstance<R extends Function>(methodReflect: MethodReflect<R>): InjectMap<BaseConstructor, InstanceReflect<any>> {
    // 注入服务映射
    const injectMap = new InjectMap();
    return injectMap;
  }

  public onNewInstanced<T extends Application>(instanceReflect: InstanceReflect<T>): void {
    const {parent} = instanceReflect;
    if (parent) {
      const { provider } = parent;
      // 注入 application 实例
      const sets = provider.get(Application as any) || new Set([instanceReflect.metadata]);
      provider.set(Application as any, sets);
    }
  }


}