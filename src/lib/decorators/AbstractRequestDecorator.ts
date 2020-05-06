import {AbstractMethodDecorator} from "@easy-node/reflect";
import {HttpMethod} from "../HttpMethod";


export abstract class AbstractRequestDecorator extends AbstractMethodDecorator {
  protected constructor(
    public path: string,
    public method: HttpMethod,
  ) {
    super();
  }
}