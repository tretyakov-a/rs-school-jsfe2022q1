import { selectFrom } from '@common/utils';

export type ViewOptions = {
  data?: unknown;
  root?: string | HtmlElement;
  mountPoint?: string | HTMLElement;
}

type HtmlElement = HTMLElement | null;

export class View {
  protected root: HtmlElement;
  protected mountPoint: HtmlElement;
  protected el: HtmlElement;
  
  constructor(options: ViewOptions = {}) {
    const { root, mountPoint } = options;
    this.root = root
      ? typeof root === 'string' ? selectFrom(document)(root) : root
      : null;
    this.mountPoint = mountPoint
      ? typeof mountPoint === 'string'
        ? selectFrom(this.root ? this.root : document)(mountPoint)
        : mountPoint
      : this.root;
    this.el = null;
  }

  public getMountPoint(): HtmlElement {
    return this.mountPoint === null ? this.root : this.mountPoint;
  }

  public getRoot(): HtmlElement {
    return this.root;
  }

  public getElement(): HtmlElement {
    return this.el;
  }

  public clear(): void {
    if (this.mountPoint) this.mountPoint.innerHTML = '';
  }

  public render(data?: unknown): void {
    this.el = this.mountPoint;
    if (this.mountPoint !== this.root) {
      this.clear();
    }
    if (data !== undefined && data instanceof HTMLElement) {
      this.el = data;
      return this.mountPoint?.append(data);
    } 
    if (data !== undefined && typeof data === 'string') {
      if (this.mountPoint) this.mountPoint.innerHTML = data;
      return;
    }
  }
}
