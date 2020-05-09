"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflect_1 = require("@easy-node/reflect");
const EnApplicationDecorator_1 = require("./EnApplicationDecorator");
exports.EnApplication = reflect_1.AbstractClassDecorator.create(EnApplicationDecorator_1.EnApplicationDecorator);
