import {describe, it} from "mocha";
import {assert} from "chai";
import {EnApplication} from "./EnApplication";
import {HttpServer} from "@easy-node/server";
import {EnController, EnGet, EnModule, EnPost} from "./decorators";
import {AbstractModule} from "./AbstractModule";
import {ModuleSet} from "./ModuleSet";
import {ControllerSet} from "./ControllerSet";
import {BaseConstructor} from "./interface";

@EnController("/test")
class TestController {

  constructor(...args: any[]) {}

  @EnGet("/info")
  public info(): string {
    return "";
  }

  @EnPost("/update")
  public update(): boolean {
    return true;
  }
}

@EnModule("/app")
class AppModule extends AbstractModule {
  constructor(
    public index: number,
  ) {
    super();
  }

  public beforeRequest(): void {

  }

  public afterRequest(): void {

  }

  public beforeResponse(): void {

  }

  public afterResponse(): void {

  }

  public controllers(): ControllerSet {
    const controller = new ControllerSet();
    controller.add(TestController);
    return controller;
  }

  static test<T extends BaseConstructor>(v: T) {

  }
}

class MyApplication extends EnApplication<HttpServer> {
  public server: HttpServer;

  public moduleSets(): ModuleSet {
    const moduleSet = new ModuleSet();
    moduleSet.add(AppModule);
    return moduleSet;
  }
}

describe("EnApplication.spec.ts", () => {
  const enApplication = EnApplication.run(MyApplication);

  it('enApplication should instanceOf EnApplication', function () {
    assert.instanceOf(enApplication, EnApplication);
  });

  const moduleSets = enApplication.moduleSets();
  it('enApplication.moduleSets() should instanceOf ModuleSet', function () {
      assert.instanceOf(moduleSets, ModuleSet);
  });

});


