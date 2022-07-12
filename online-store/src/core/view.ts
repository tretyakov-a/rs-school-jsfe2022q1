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
  public isLoading: boolean;
  
  constructor(options: ViewOptions) {
    const { root } = options;
    this.component = options.component;
    this.root = root || null;
    this._root = null;
    this.isLoading = false;
  }

  public getRoot(): HTMLElement {
    return this._root === null
      ? typeof this.root !== 'string'
        ? withNullCheck(this.root)
        : selectFrom(document)(this.root)
      : this._root;
  }

  public afterRender(parent: Component | null, id: number = -1): void {
    this._root = (typeof this.root === 'string')
      ? id === -1
        ? selectFrom(parent!.getRoot())(this.root)
        : selectFrom(parent!.getRoot())(`${this.root}:nth-child(${id + 1})`)
      : this.root;
    if (this.root === null) {
      this.root = parent!.getRoot();
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
