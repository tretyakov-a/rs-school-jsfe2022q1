import './garage-race.scss';
import { ViewOptions } from '@core/view';
import { LoaderView } from '@core/loader-view';
import { AppLoadEventData } from '@components/app';
import { CarEntity } from '@common/car';
import { CarsListItem } from '@components/garage-page/cars-list-item';
import { renderPaginator } from '@views/shared';
import { Component } from '@core/component';
import { LoadingOverlayView } from '@views/loading-overlay';

export class GarageRaceView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.garage-race',
    })
  }

  private renderCars(data: AppLoadEventData) {
    const { cars, isRaceInProgress } = data;
    const carsData = cars.map((car) => this.renderChild('cars', CarsListItem, { data: { car, isRaceInProgress } }));
    return `<ul class="garage__cars-list cars-list">${carsData.join('')}</ul>`;
  }

  private renderPage(data: AppLoadEventData) {
    const { garagePageNumber, carsAmount } = data;
    const renderCarsParginator = renderPaginator.bind(this, garagePageNumber, carsAmount, 'garage');
    return `
      <h2 class="garage-race__title page-title">
        Garage <span class="page-title__total-amount">(${carsAmount})</span>
      </h2>
      ${renderCarsParginator()}
      <div class="garage-race__tracks">
        ${this.renderChild('overlay', Component, {
          viewConstructor: LoadingOverlayView
        })}
        <div class="garage-race__tracks-flag"></div>
        ${this.renderCars(data)}
      </div>
      ${renderCarsParginator()}
    `;
  }

  public render(data: AppLoadEventData): string {
    let html = '';
    if (data !== undefined) {
      const { error, carsAmount } = data;

      html = !error
        ? carsAmount === 0 ? 'There is no cars' : this.renderPage(data)
        : `Load error: ${error.message}`;
    }

    return super.render((loader: string) => `
      <div class="garage-race">
        ${loader !== '' ? loader : html}
      </div>
    `);
  }
}