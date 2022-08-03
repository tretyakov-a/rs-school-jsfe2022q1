import './garage-page.scss';
import { ViewOptions } from '@core/view';
import { LoaderView } from '@core/loader-view';
import { AppLoadEventData } from '@components/app';
import { Component } from '@core/component';
import { CarImgView } from '../../car-img/index';
import { CreateCar } from '../../../components/garage-page/create-car';
import { Car } from '@common/car';
import { EVENT } from '@common/constants';

export class GaragePageView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.garage',
    })
  }

  private renderCars(cars: Car[]) {
    const carsData = cars.map(({ name, color }) => `
      <li class="cars-list__item car">
        <div class="car__header">
          <button class="car__select button">Select</button>
          <button class="car__remove button">Remove</button>
          <div class="car__title">${name}</div>
        </div>
        <div class="car__track">
          <div class="car__controls">
            <button class="car__accelerate button">A</button>
            <button class="car__break button">B</button>
          </div>
          <div class="car__img">
            ${this.renderChild('cars', Component, {
              viewConstructor: CarImgView,
              viewOptions: {
                data: color
              }
            })}
          </div>
        </div>
      </li>
    `)
    return `<ul class="garage__cars-list cars-list">${carsData.join('')}</ul>`;
  }
  
  private renderPage(data: AppLoadEventData) {
    const { state: { pageNumber }, cars, carsAmount } = data;
    return `
      <div class="garage__control-panel control-panel">
        ${this.renderChild('createCar', CreateCar, { data: {
          buttonContent: 'Create',
          buttonClickEvent: EVENT.CREATE_CAR,
        }})}
        ${this.renderChild('createCar', CreateCar, { data: {
          buttonContent: 'Update',
          buttonClickEvent: EVENT.UPDATE_CAR,
        }})}
        <div class="control-panel__buttons-group">
          <button class="button">Race</button>
          <button class="button">Reset</button>
          <button class="button">Generate cars</button>
        </div>
      </div>
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