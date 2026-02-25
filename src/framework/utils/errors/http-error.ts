export default class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public errorMessage: string,
  ) {
    super(`Http Error ${status}: ${statusText} - ${errorMessage}`);
    this.name = "HttpError";
  }
}
