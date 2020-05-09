"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflect_1 = require("@easy-node/reflect");
class Application {
    static run(App) {
        const classReflect = reflect_1.reflectClass(App);
        const instanceReflect = classReflect.newInstance((classReflect, parameters) => {
            return [];
        });
        return instanceReflect.metadata;
    }
}
exports.Application = Application;
