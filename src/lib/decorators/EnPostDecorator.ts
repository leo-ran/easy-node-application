import {AbstractRequestDecorator} from "./AbstractRequestDecorator";
import {HttpMethod} from "../HttpMethod";

export class EnPostDecorator extends AbstractRequestDecorator {
  constructor(
    path: string
  ) {
    super(
      path,
      HttpMethod.POST
    );
  }
}