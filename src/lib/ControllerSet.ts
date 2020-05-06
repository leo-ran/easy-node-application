import {BaseConstructor} from "./interface";

export class ControllerSet<T extends BaseConstructor = BaseConstructor> extends Set<T> {
  public toArray(): T[] {
    return Array.from(this);
  }
}