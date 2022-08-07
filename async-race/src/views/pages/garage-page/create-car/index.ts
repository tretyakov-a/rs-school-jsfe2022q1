import './create-car.scss';
import { Component, ComponentHandler } from "@core/component";
import { View } from "@core/view";
import { Button } from '@components/button';
import { LoadingOverlayView } from "@views/loading-overlay";
import { carModels } from '@common/constants';

type CreateCarViewData = {
  handleClick: ComponentHandler;
  buttonContent: string;
  carName: string;
  color: string;
}

export class CreateCarView extends View {

  private renderOptions() {
    return carModels.map((model) => `<option value="${model}">${model}</option>`).join('');
  }

  private renderInput(data: CreateCarViewData) {
    const { buttonContent, carName } = data;
    const input = buttonContent === 'Create'
      ? `<select class="create-car__input select">
          ${this.renderOptions()}
        </select>`
      : `<input type="text" class="create-car__input text" placeholder="Car model" value="${carName}">`;
    return input;
  }

  public render(data?: CreateCarViewData): string {
    if (data === undefined) return '';
    const { handleClick, buttonContent, carName, color } = data;
    return super.render(`
      <div class="control-panel__${buttonContent.toLowerCase()}-car create-car">
        ${this.renderChild('overlay', Component, {
          viewConstructor: LoadingOverlayView
        })}
        
        ${this.renderInput(data)}
        <input type="color" class="create-car__color-pick" value="${color}">
        ${this.renderChild('button', Button, {
          handlers: { onClick: handleClick },
          viewOptions: { data: {
            content: buttonContent,
            classes: 'create-car__submit button',
          }}
        })}
      </div>
    `)
  }
}