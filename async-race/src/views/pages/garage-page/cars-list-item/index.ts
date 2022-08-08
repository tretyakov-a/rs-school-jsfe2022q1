import './cars-list-item.scss';
import { Component, ComponentHandler } from "@core/component";
import { View, ViewOptions } from "@core/view";
import { CarEntity } from '@common/car';
import { LoadingOverlayView } from '@views/loading-overlay';
import { CarImg } from '@components/garage-page/car-img';
import { renderButtons } from '@views/shared';

type CarsListItemViewData = {
  car: CarEntity;
  selectHandler: ComponentHandler;
  removeHandler: ComponentHandler;
  accelerateHandler: ComponentHandler;
  breakHandler: ComponentHandler;
};

export class CarsListItemView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: `.cars-list__item`,
    });
  }

  public render(data: CarsListItemViewData): string {
    const {
      car: { name, color },
      selectHandler,
      removeHandler,
      accelerateHandler,
      breakHandler
    } = data;

    return super.render(`
      <li class="cars-list__item car">
        ${this.renderChild('overlay', Component, {
          viewConstructor: LoadingOverlayView
        })}
        <div class="car__winner">
          <span class="car__winner-title">
            <i class="fa-solid fa-trophy"></i>
            Winner!
          </span>
          <span class="car__finish-time"></span>
        </div>
        <div class="car__header">
          ${renderButtons.call(this, 'car', {
            'select': { handler: selectHandler },
            'remove': {
              handler: removeHandler,
              content: `<i class="fa-solid fa-trash-can"></i>`,
              classes: 'button_negative',
            },
          })}
          <div class="car__title">${name}</div>
        </div>
        <div class="car__body">
          <div class="car__controls">
            ${renderButtons.call(this, 'car', {
              'accelerate': { handler: accelerateHandler, content: 'A' },
              'break': { handler: breakHandler, content: 'B', classes: 'button_negative' },
            })}
          </div>
          <div class="car__track">
            ${this.renderChild('carImg', CarImg, {
              viewOptions: {
                data: color
              }
            })}
          </div>
        </div>
      </li>
    `)
  }
  renderButtons(arg0: string, arg1: { select: ComponentHandler[]; remove: ComponentHandler[]; }) {
    throw new Error('Method not implemented.');
  }
}