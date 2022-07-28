import { View, ViewOptions } from '@core/view';

export class SpinnerView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.lds-ellipsis',
    })
  }

  render(): string {
    return super.render(`
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `);
  }
}
