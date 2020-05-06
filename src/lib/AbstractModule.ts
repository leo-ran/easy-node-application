import {ControllerSet} from "./ControllerSet";

export abstract class AbstractModule {

  abstract controllers(): ControllerSet;

  public onInit?(...args: any[]): void;

  public beforeRequest?(...args: any[]): void;

  public afterRequest?(...args: any[]): void;

  public beforeResponse?(...args: any[]): void;

  public afterResponse?(...args: any[]): void;
}