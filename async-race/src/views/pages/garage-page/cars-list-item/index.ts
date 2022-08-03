import './cars-list-item.scss';
import { Component } from "@core/component";
import { View, ViewOptions } from "@core/view";
import { CarImgView } from "@views/car-img";
import { Car } from '@common/car';

export class CarsListItemView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: `.cars-list__item`,
    });
  }

  public render(data: { car: Car }): string {
    const { car: { name, color } } = data;
    return super.render(`
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
            ${this.renderChild('carImg', Component, {
              viewConstructor: CarImgView,
              viewOptions: {
                data: color
              }
            })}
          </div>
        </div>
      </li>
    `)
  }
}