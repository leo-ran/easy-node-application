import { AbstractClassDecorator, BaseConstructor, InstanceReflect, MethodReflect } from "@easy-node/reflect";
import { Application } from "../../Application";
import { InjectMap } from "@easy-node/reflect/dist/lib/InjectMap";
export declare class EnApplicationDecorator<T extends BaseConstructor> extends AbstractClassDecorator {
    modules: T[];
    constructor(modules: T[]);
    onNewInstance<R extends Function>(methodReflect: MethodReflect<R>): InjectMap<BaseConstructor, InstanceReflect<any>>;
    onNewInstanced<T extends Application>(instanceReflect: InstanceReflect<T>): void;
}
