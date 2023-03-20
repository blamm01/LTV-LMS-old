export class EError extends Error {
  code: string;

  constructor(message: string | undefined, code: string) {
    super(message);
    this.code = code;
    Object.defineProperty(this, "message", {
      enumerable: true,
    });
  }
}
