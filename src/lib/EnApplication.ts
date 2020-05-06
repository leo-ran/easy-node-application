import {HttpContext, HttpServer, HttpsServer} from "@easy-node/server";
import {
  AbstractClassDecorator, AbstractMethodDecorator, AbstractParameterDecorator, AbstractPropertyDecorator,
  BaseConstructor,
  ClassReflect,
  ClassSet, DecoratorFactory,
  InstanceReflect,
  MethodReflect, ParameterReflect,
  reflectClass
} from "@easy-node/reflect";
import {ModuleSet} from "./ModuleSet";
import {EnModuleDecorator} from "./decorators/EnModuleDecorator";
import Base = Mocha.reporters.Base;
import {iDebuglog} from "@easy-node/reflect/dist/utils";

export abstract class EnApplication<S extends Server = any> {
  private moduleReflectMap: Map<ClassReflect<any>, InstanceReflect<any>> = new Map();

  abstract server: S;

  /**
   * 包含的模块
   */
  abstract moduleSets(): ModuleSet;

  /**
   * 给模块提供服务
   * 服务提供
   * 如果子类重写 请使用
   * const map = super.providers();
   * map.set(object, object);
   * 在实例化模块时 根据 map的key来映射map的value来注入到模块中
   * return map;
   */
  private providers(): Map<object, object> {
    const map = new Map<object, object>();
    map.set(EnApplication, this);
    map.set(HttpServer, this.server);
    map.set(ModuleSet, this.moduleSets());
    return map;
  }

  public registerModules(moduleSet: ModuleSet = this.moduleSets()) {
    moduleSet.forEach(item => {
      const classReflect = reflectClass(item as BaseConstructor);
      const isModule = classReflect.metadata.find(instanceReflect => {
        return instanceReflect.instanceOf(EnModuleDecorator);
      });

      // 检测是否为模块 根据 @EnModule 装饰器来判断
      if (!isModule) {
        throw new TypeError(`class ${item.name} must be used @EnModule() decorator.`);
      }

      // 触发装饰器处理函数
      EnApplication.decoratorEventEmit(
        isModule.metadata.constructor,
        isModule.metadata,
        this,
      );

      // 获取构造函数的 映射对象
      const methodReflect = classReflect.instanceMembers.get('constructor');
      if (methodReflect instanceof MethodReflect) {
        methodReflect.parameters.map(parameterReflect => {
          parameterReflect.metadata.forEach(instanceReflect => {

          })
        });
      }
    })
  }

  static run<T extends EnApplicationConstructor>(App: T): EnApplication {
    const enApplication = Reflect.construct(App, []) as EnApplication;
    enApplication.registerModules();
    return  enApplication;
  }


  static decoratorEventListeners = new Map<DecoratorEventType, Set<DecoratorEventHandler>>();

  /**
   * 添加装饰器使用监听
   * @param decorator 装饰器类 或 装饰器 工厂函数
   * @param handler 处理函数
   * @param once 是否只调用一次
   */
  static addDecoratorEventListener<
    T extends DecoratorEventType,
    >(decorator: T, handler: DecoratorEventHandler, once?: boolean) {
    if ((<DecoratorFactory<any, any, any>>decorator).class) {
      decorator = (<DecoratorFactory<any, any, any>>decorator).class;
    }
    if (typeof handler !== "function") return;
    const handlers = EnApplication.decoratorEventListeners.get(decorator) || new Set<DecoratorEventHandler>();
    // 如果只是一次性事件
    if (once) {
      const h: DecoratorEventHandler = (...args) => {
        handlers.delete(h);
        handler(...args);
      };
      handlers.add(h);
    } else {
      handlers.add(handler);
    }
    EnApplication.decoratorEventListeners.set(decorator, handlers);
  }

  static decoratorEventEmit<
    T extends DecoratorEventType,
    I extends AbstractClassDecorator | AbstractMethodDecorator | AbstractPropertyDecorator | AbstractParameterDecorator,
    A extends EnApplication,
    C extends HttpContext,
    >(decorator: T,  decoratorInstance: I,  app: A, context?: C) {
    const handlers = EnApplication.decoratorEventListeners.get(decorator);
    if (handlers instanceof Set) {
      handlers.forEach(item => item(decoratorInstance, app, context))
    }
  }
}

export type Server = HttpsServer | HttpServer;
export interface EnApplicationConstructor {
  new (...args: any[]): EnApplication;
}
export interface DecoratorEventHandler {
  <
    I extends AbstractClassDecorator | AbstractMethodDecorator | AbstractPropertyDecorator | AbstractParameterDecorator,
    A extends EnApplication,
    C extends HttpContext
  >(
    /**
     * 装饰器 实例
     */
    decoratorInstance: I,
    /**
     * 当前 EnApplication 实例
     */
    app: A,
    /**
     * Http 请求上下文 此参数必须在 server request 阶段才能使用
     * 例如 初始化 模块时无法调用
     * 例如 初始化 控制器类时无法调用
     */
    context?: C
  ): any;
}
export type DecoratorEventType = DecoratorFactory<any, any, any> | AbstractClassDecorator | AbstractMethodDecorator | AbstractPropertyDecorator | AbstractParameterDecorator;

