export declare abstract class Application {
    static run<T extends ApplicationConstructor>(App: T): InstanceType<T>;
}
export interface ApplicationConstructor {
    new (path: string): Application;
}
