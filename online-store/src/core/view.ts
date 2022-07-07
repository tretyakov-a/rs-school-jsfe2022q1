import { selectFrom } from '@common/utils';

export type ViewOptions = {
  data?: unknown;
  root?: string | HTMLElement;
  contentEl?: string | HTMLElement;
}

type HtmlElement = HTMLElement | null;

export class View {
  protected root: HtmlElement;
  protected contentEl: HtmlElement;
  protected el: HtmlElement;
  
  constructor(options: ViewOptions = {}) {
    const { root, contentEl } = options;
    this.root = root
      ? typeof root === 'string' ? selectFrom(document)(root) : root
      : null;
    this.contentEl = contentEl
      ? typeof contentEl === 'string'
        ? selectFrom(this.root ? this.root : document)(contentEl)
        : contentEl
      : this.root;
    this.el = null;
    this.render(options.data);
  }

  public getContentEl(): HtmlElement {
    return this.contentEl === null ? this.root : this.contentEl;
  }

  public getRoot(): HtmlElement {
    return this.root;
  }

  public getElement(): HtmlElement {
    return this.el;
  }

  public clear(): void {
    (this.contentEl as HTMLElement).innerHTML = '';
  }

  public render(data?: unknown): void {
    if (this.contentEl !== this.root) {
      this.clear();
    }
    if (data !== undefined && data instanceof Node) {
      this.el = data as HTMLElement;
      return this.contentEl?.append(data);
    } 
    if (data !== undefined && typeof data === 'string') {
      (this.contentEl as HTMLElement).innerHTML = data;
      return;
    }
  }
}
