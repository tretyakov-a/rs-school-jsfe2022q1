
type QueryParams = Record<string, string>;

export class ActiveRoute {

  static getPath(): string {
    return window.location.hash.split('?')[0];
  }

  static getQueryParams(): QueryParams {
    const [ _, queryString ] = window.location.hash.split('?');

    let queryParams: QueryParams = {};

    if (queryString !== undefined && queryString !== '') {
      queryParams = queryString
        .split('&')
        .map((paramString) => paramString.split('='))
        .reduce((acc: QueryParams, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {})
    }
    
    return queryParams;
  }

  static change(hash: string): void {
    const { origin, pathname } = window.location;
    location.replace(`${origin}${pathname}#${hash}`);
  }
}