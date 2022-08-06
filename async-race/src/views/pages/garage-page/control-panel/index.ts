import './control-panel.scss';
import { View, ViewOptions } from '@core/view';
import { EVENT } from '@common/constants';
import { CreateCar } from '@components/garage-page/create-car';
import { Component, ComponentHandler } from '@core/component';
import { capitalize } from '@common/utils';
import { LoadingOverlayView } from '@views/loading-overlay';
import { renderButtons } from '@views/shared';

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
    const { raceHandler, resetHandler, generateCarsHandler } = data;
    return super.render(`
      <div class="garage__control-panel control-panel">
        ${this.renderChild('overlay', Component, {
          viewConstructor: LoadingOverlayView
        })}
        ${this.renderForms({
          'create': EVENT.TRY_CREATE_CAR,
          'update': EVENT.TRY_UPDATE_CAR,
        })}
        <div class="control-panel__buttons-group">
          ${renderButtons.call(this, 'control-panel', {
            'race': [raceHandler],
            'reset': [resetHandler],
            'generate': [generateCarsHandler],
          })}
        </div>
      </div>
    `);
  }
}