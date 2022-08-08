export enum HTTP_CODES {
  SERVER_ERROR = 500,
}

export class HttpError extends Error {
  public status: number;

  constructor(res: Response) {
    super(`Http error: ${res.statusText}`)
    this.status = res.status;
  }
}

export function handleHttpErrors(res: Response): Response {
  if (!res.ok) {
    throw new HttpError(res);
  }
  return res;
}
