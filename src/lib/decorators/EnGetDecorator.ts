import {AbstractRequestDecorator} from "./AbstractRequestDecorator";
import {HttpMethod} from "../HttpMethod";

export class EnGetDecorator extends AbstractRequestDecorator {
  constructor(
    path: string
  ) {
    super(
      path,
      HttpMethod.GET
    );
  }
}