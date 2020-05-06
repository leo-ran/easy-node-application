import {AbstractClassDecorator} from "@easy-node/reflect";

export class EnControllerDecorator extends AbstractClassDecorator {
  public constructor(
    public path: string,
  ) {
    super();
  }
}