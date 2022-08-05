import './cars-list-item.scss';
import { Component, ComponentHandler } from "@core/component";
import { View, ViewOptions } from "@core/view";
import { CarEntity } from '@common/car';
import { Button } from '@components/button';
import { capitalize } from '@common/utils';
import { LoadingOverlayView } from '@views/loading-overlay';
import { CarImg } from '@components/garage-page/car-img';

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

  private renderButtons(buttons: Record<string, [ComponentHandler, string?]>) {
    return Object.keys(buttons)
      .map((name) => {
        const [ handler, content] = buttons[name];
        return this.renderChild(name, Button, {
          handlers: { onClick: handler },
          viewOptions: {
            root: `.car__${name}`,
            data: { content: content || capitalize(name), classes: `car__${name} button` }
          }
        })
      })
      .join('');
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
        <div class="car__header">
          ${this.renderButtons({
            'select': [selectHandler],
            'remove': [removeHandler],
          })}
          <div class="car__title">${name}</div>
        </div>
        <div class="car__body">
          <div class="car__controls">
            ${this.renderButtons({
              'accelerate': [accelerateHandler, 'A'],
              'break': [breakHandler, 'B'],
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
}