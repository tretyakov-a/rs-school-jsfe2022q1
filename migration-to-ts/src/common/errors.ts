
import { HttpCode } from '@common/constants';

const messages: Record<HttpCode, (url?: string) => string> = {
  [HttpCode.BAD_REQUEST]: () => `Bad request`,
  [HttpCode.UNAUTHORIZED]: () => `You are not authorised`,
  [HttpCode.NOT_FOUND]: (url?: string) => `Resourse not found`,
  [HttpCode.TOO_MANY_REQUESTS]: () => `You have made too many requests recently`,
  [HttpCode.SERVER_ERROR]: () => `Internal server error`,
}

export class HttpError extends Error {
  private res: Response;

  constructor(res: Response) {
    const code = res.status as HttpCode;
    super(`Http error ${code}! ${messages[code](res.url)}`);
    this.res = res;
  }
}
