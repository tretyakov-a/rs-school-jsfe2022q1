import './loading-overlay.scss';
import { View, ViewOptions } from '@core/view';
import { SpinnerView } from '@views/spinner';
import { Component } from '@core/component';

export class LoadingOverlayView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.loading-overlay',
    })
  }

  public render(): string {
    return super.render(`
      <div class="loading-overlay">
        ${this.renderChild('spinner', Component, {
          viewConstructor: SpinnerView,
        })}
      </div>
    `);
  }
}