import {AbstractRequestDecorator} from "./AbstractRequestDecorator";
import {HttpMethod} from "../HttpMethod";

export class EnOptionsDecorator extends AbstractRequestDecorator {
  constructor(
    path: string
  ) {
    super(
      path,
      HttpMethod.OPTIONS
    );
  }
}