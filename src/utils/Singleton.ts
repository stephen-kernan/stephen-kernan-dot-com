// This is a simple Singleton class that can be used to store a single instance of a class in the global namespace
// borrowed from https://github.com/vercel/next.js/discussions/15054#discussioncomment-658138
export class Singleton<T> {
  private readonly sym: symbol;

  constructor(uniqueName: string) {
    this.sym = Symbol.for(uniqueName);
  }

  get value(): T | undefined {
    return (global as Record<symbol, unknown>)[this.sym] as T | undefined;
  }

  set value(value: T) {
    (global as Record<symbol, unknown>)[this.sym] = value;
  }
}
