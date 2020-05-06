import {AbstractClassDecorator, AbstractMethodDecorator} from "@easy-node/reflect";
import {EnModuleDecorator} from "./EnModuleDecorator";
import {EnControllerDecorator} from "./EnControllerDecorator";
import {EnGetDecorator} from "./EnGetDecorator";
import {EnPostDecorator} from "./EnPostDecorator";
import {EnOptionsDecorator} from "./EnOptionsDecorator";

/**
 * 模块装饰器
 */
export const EnModule = AbstractClassDecorator.create(EnModuleDecorator);
/**
 * 控制器装饰器
 */
export const EnController = AbstractClassDecorator.create(EnControllerDecorator);

/**
 * 控制器方法装饰器
 */
export const EnGet = AbstractMethodDecorator.create(EnGetDecorator);
export const EnPost = AbstractMethodDecorator.create(EnPostDecorator);
export const EnOptions = AbstractMethodDecorator.create(EnOptionsDecorator);
