import { selectFrom } from '../common/utils';

export type DrawData<T> = T[] | HTMLElement | string;

export type ViewOptions<T> = {
  data?: DrawData<T>;
  name?: string;
  root?: string | HTMLElement;
  contentEl?: string | HTMLElement;
}

type HtmlElement = HTMLElement | null;

export class View<T> {
  protected root: HtmlElement;
  protected contentEl: HtmlElement;
  
  constructor(options: ViewOptions<T> = {}) {
    const { root, contentEl } = options;
    this.root = root
      ? typeof root === 'string' ? selectFrom(document)(root) : root
      : null;
    this.contentEl = contentEl
      ? typeof contentEl === 'string'
        ? selectFrom(this.root ? this.root : document)(contentEl)
        : contentEl
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
