import './winners-page.scss';
import { View, ViewOptions } from '@core/view';
import { WinnersTable } from '@components/winners-page/winners-table';

export class WinnersPageView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.winners',
    })
  }

  public render(): string {
    return super.render(`
      <div class="winners">
        <div class="winners__container container">
          <h2 class="winners__title page-title">Winners</h2>
          ${this.renderChild('winnersTable', WinnersTable)}
        </div>
      </div>
    `);
  }
}