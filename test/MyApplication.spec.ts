import {describe, it} from "mocha";
import {assert} from "chai";
import {Application} from "../src/lib/Application";
import {MyApplication} from "./MyApplication";

const app = Application.run(MyApplication);



describe("MyApplication.spec.ts", () => {
  it('app should instanceof MyApplication', function () {
      assert.instanceOf(app, MyApplication);
  });

  it('app should instanceof Application', function () {
    assert.instanceOf(app, Application);
  });
});