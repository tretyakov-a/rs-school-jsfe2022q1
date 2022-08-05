import { View, ViewOptions } from '@core/view';

export class SpinnerView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.lds-dual-ring',
    })
  }

  render(): string {
    return super.render(`
      <div class="lds-dual-ring"></div>
    `);
  }
}
