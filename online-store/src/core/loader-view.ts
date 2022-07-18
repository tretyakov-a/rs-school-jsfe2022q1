import { SpinnerView } from "@views/spinner";
import { Component } from "./component";
import { View, ViewOptions } from "./view";

export class LoaderView extends View {
  public isLoading: boolean;
  
  constructor(options: ViewOptions) {
    super(options);
    
    this.isLoading = false;
  }

  public render(data: unknown | ((loader: string) => string)): string {
    const html = this.isLoading
      ? this.renderChild('spinner', Component, {
          viewConstructor: SpinnerView
        })
      : typeof data === 'string' ? data : '';
    return typeof data === 'function'
      ? data(html)
      : html;
  }
}