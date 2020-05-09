"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflect_1 = require("@easy-node/reflect");
const Application_1 = require("../../Application");
const InjectMap_1 = require("@easy-node/reflect/dist/lib/InjectMap");
class EnApplicationDecorator extends reflect_1.AbstractClassDecorator {
    constructor(modules) {
        super();
        this.modules = modules;
    }
    onNewInstance(methodReflect) {
        // 注入服务映射
        const injectMap = new InjectMap_1.InjectMap();
        return injectMap;
    }
    onNewInstanced(instanceReflect) {
        const { parent } = instanceReflect;
        if (parent) {
            const { provider } = parent;
            // 注入 application 实例
            const sets = provider.get(Application_1.Application) || new Set([instanceReflect.metadata]);
            provider.set(Application_1.Application, sets);
        }
    }
}
exports.EnApplicationDecorator = EnApplicationDecorator;
