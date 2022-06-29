import { selectFrom } from '../common/utils';

export type DrawData<T> = T[] | HTMLElement | string;

export type ViewOptions<T> = {
  data?: DrawData<T>;
  name?: string;
  root?: string;
  contentEl?: string;
}

type HtmlElement = HTMLElement | null;

export class View<T> {
  protected root: HtmlElement;
  protected contentEl: HtmlElement;
  
  constructor(options: ViewOptions<T> = {}) {
    this.root = options.root ? selectFrom(document)(options.root) : null;
    this.contentEl = options.contentEl
      ? (this.root ? selectFrom(this.root)(options.contentEl) : selectFrom(document)(options.contentEl))
      : this.root;
    this.render(options);
  }

  public getContentEl(): HtmlElement {
    return this.contentEl === null ? this.root : this.contentEl;
  }

  public getRoot(): HtmlElement {
    return this.root;
  }

  public render(options: ViewOptions<T>): boolean | void | HTMLElement {
    const { data } = options;
    if (data !== undefined && data instanceof Node) {
      console.log(data);
      (this.contentEl as HTMLElement).innerHTML = '';
      this.contentEl?.append(data);
      return true;
    }
    if (data !== undefined && typeof data === 'string') {
      (this.contentEl as HTMLElement).innerHTML = data;
      return true;
    }
    return false;
  };

}
