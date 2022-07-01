
import { HttpCode } from '@common/constants';

const messages = {
  [HttpCode.UNAUTHORIZED]: () => ` You are not authorised`,
  [HttpCode.NOT_FOUND]: (url: string) => ` Resourse ${url} not found`,
  [HttpCode.TOO_MANY_REQUESTS]: () => ` You have made too many requests recently`,
}

export class HttpError extends Error {
  private res: Response;

  constructor(res: Response) {
    const code = res.status as HttpCode;
    super(`Http error ${code}! ${messages[code](res.url)}`);
    this.res = res;
  }
}
