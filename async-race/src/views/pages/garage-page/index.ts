import './garage-page.scss';
import { View, ViewOptions } from '@core/view';
import { ControlPanel } from '@components/garage-page/control-panel';
import { GarageRace } from '@components/garage-page/garage-race';

export class GaragePageView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.garage',
    })
  }

  public render(): string {
    return super.render(`
      <div class="garage">
        <div class="garage__container container">
          ${this.renderChild('controlPanel', ControlPanel)}
          ${this.renderChild('garageRace', GarageRace)}
        </div>
      </div>
    `);
  }
}