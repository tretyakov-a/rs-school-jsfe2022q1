import './control-panel.scss';
import { View, ViewOptions } from '@core/view';
import { EVENT } from '@common/constants';
import { CreateCar } from '@components/garage-page/create-car';
import { ComponentHandler } from '@core/component';
import { Button } from '@components/button';
import { capitalize } from '@common/utils';

type ControlPanelViewData = {
  raceHandler: ComponentHandler;
  resetHandler: ComponentHandler;
  generateCarsHandler: ComponentHandler;
}

export class ControlPanelView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.control-panel',
    })
  }

  private renderButtons(data: ControlPanelViewData) {
    const { raceHandler, resetHandler, generateCarsHandler } = data;
    const buttons: Record<string, ComponentHandler> = {
      'race': raceHandler,
      'reset': resetHandler,
      'generate': generateCarsHandler,
    }

    return Object.keys(buttons)
      .map((name) => this.renderChild(name, Button, {
        handlers: { onClick: buttons[name] },
        viewOptions: {
          root: `.control-panel__${name}`,
          data: { content: capitalize(name), classes: `control-panel__${name} button` }
        }
      }))
      .join('');
  }

  private renderForms(data: Record<string, EVENT>) {
    return Object.keys(data)
      .map((name) => this.renderChild(name, CreateCar, {
        viewOptions: { root: `.control-panel__${name}-car` },
        data: {
          buttonContent: capitalize(name),
          buttonClickEvent: data[name],
        }}
      ))
      .join('');
  }

  public render(data: ControlPanelViewData): string {
    return super.render(`
      <div class="garage__control-panel control-panel">
        ${this.renderForms({
          'create': EVENT.TRY_CREATE_CAR,
          'update': EVENT.TRY_UPDATE_CAR,
        })}
        <div class="control-panel__buttons-group">
          ${this.renderButtons(data)}
        </div>
      </div>
    `);
  }
}