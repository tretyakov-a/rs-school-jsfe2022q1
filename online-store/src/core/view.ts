import { selectFrom } from '@common/utils';
import { Component, renderChildOptions } from '@core/component';
import { withNullCheck } from '@common/utils';

type Root = string | HTMLElement | null;

export type ViewOptions = {
  component: Component,
  data?: unknown;
  root?: Root;
}

export class View {
  protected component: Component;
  protected root: Root;
  protected _root: HTMLElement | null;
  
  constructor(options: ViewOptions) {
    const { root, component } = options;
    this.component = component;
    this.root = root || null;
    this._root = null;
  }

  public getRoot(): HTMLElement {
    return this._root === null
      ? typeof this.root !== 'string'
        ? withNullCheck(this.root)
        : selectFrom(document)(this.root)
      : this._root;
  }

  public afterRender(parent: Component | null, id = -1): void {

    if (typeof this.root === 'string') {
      if (id === -1 && parent !== null) {
        this._root = selectFrom(parent.getRoot())(this.root);
      } else if (parent !== null) {
        const el = parent.getRoot().querySelectorAll(this.root)[id];
        if (el instanceof HTMLElement)
          this._root = el;
      }
    } else {
      this._root = this.root;
    }
  }

  protected renderChild(
    ...options: renderChildOptions
  ): string {
    return this.component.renderChild(...options)
  }

  public render(data?: unknown): string {
    if (data !== undefined && typeof data === 'string') {
      return data;
    }
    return '';
  }
}
