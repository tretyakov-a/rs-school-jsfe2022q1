import './garage-race.scss';
import { ViewOptions } from '@core/view';
import { LoaderView } from '@core/loader-view';
import { AppLoadEventData } from '@components/app';
import { CarEntity } from '@common/car';
import { CarsListItem } from '@components/garage-page/cars-list-item';
import { PaginatorView } from '../../../paginator/index';
import { Component } from '@core/component';
import { Paginator } from '@components/paginator';

export class GarageRaceView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.garage-race',
    })
  }

  private renderCars(cars: CarEntity[]) {
    const carsData = cars.map((car) => this.renderChild('cars', CarsListItem, { data: { car } }));
    return `<ul class="garage__cars-list cars-list">${carsData.join('')}</ul>`;
  }
  
  private renderPage(data: AppLoadEventData) {
    const { garagePageNumber, cars, carsAmount } = data;
    return `
      <h2 class="garage-race__title page-title">
        Garage<span class="garage-race__cars-amount">(${carsAmount})</span>
      </h2>
      ${this.renderChild('paginator', Paginator, {
        data: { pageNumber: garagePageNumber, carsAmount, pageName: 'garage' }
      })}
      <div class="garage-race__tracks">
        <div class="garage-race__tracks-flag"></div>
        ${this.renderCars(cars)}
      </div>
      ${this.renderChild('paginator', Paginator, {
        data: { pageNumber: garagePageNumber, carsAmount, pageName: 'garage' }
      })}
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
      <div class="garage-race">
        ${loader !== '' ? loader : html}
      </div>
    `);
  }
}