import {AbstractModule} from "./AbstractModule";

export class ModuleSet<T extends { new (...args: any[]): AbstractModule} = any> extends Set<T> {
  /**
   * 转为数组
   */
  public toArray(): T[] {
    return Array.from(this);
  }
}