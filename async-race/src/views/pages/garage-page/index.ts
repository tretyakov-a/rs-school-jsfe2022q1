import './garage-page.scss';
import { ViewOptions } from '@core/view';
import { LoaderView } from '@core/loader-view';
import { AppLoadEventData } from '@components/app';
import { Car } from '@common/car';
import { ControlPanel } from '@components/garage-page/control-panel';
import { CarsListItem } from '@components/garage-page/cars-list-item';

export class GaragePageView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.garage',
    })
  }

  private renderCars(cars: Car[]) {
    const carsData = cars.map((car) => this.renderChild('cars', CarsListItem, { data: { car } }));
    return `<ul class="garage__cars-list cars-list">${carsData.join('')}</ul>`;
  }
  
  private renderPage(data: AppLoadEventData) {
    const { state: { pageNumber }, cars, carsAmount } = data;
    return `
      ${this.renderChild('controlPanel', ControlPanel)}
      <div class="garage-race">
        <h2 class="garage-race__title page-title">
          Garage<span class="garage-race__cars-amount">(${carsAmount})</span>
        </h2>
        <div class="garage-race__page-number">Page #${pageNumber}</div>
        <div class="garage-race__tracks">
          <div class="garage-race__tracks-flag"></div>
          ${this.renderCars(cars)}
        </div>
        <div class="paginator">Назад Вперед</div>
      </div>
    `;
  }

  public render(data: AppLoadEventData): string {
    let html = '';
    if (data !== undefined) {
      const { error } = data;

      html = !error
        ? this.renderPage(data)
        : `Load error`;
    }

    return super.render((loader: string) => `
      <div class="garage">
        <div class="garage__container container">
          ${loader !== '' ? loader : html}
        </div>
      </div>
    `);
  }
}