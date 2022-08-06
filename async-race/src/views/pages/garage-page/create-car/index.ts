import './create-car.scss';
import { Component, ComponentHandler } from "@core/component";
import { View } from "@core/view";
import { Button } from '@components/button';
import { LoadingOverlayView } from "@views/loading-overlay";

type CreateCarViewData = {
  handleClick: ComponentHandler;
  buttonContent: string;
  carName: string;
  color: string;
}

export class CreateCarView extends View {

  public render(data?: CreateCarViewData): string {
    if (data === undefined) return '';
    const { handleClick, buttonContent, carName, color } = data;
    return super.render(`
      <div class="control-panel__${buttonContent.toLowerCase()}-car create-car">
        ${this.renderChild('overlay', Component, {
          viewConstructor: LoadingOverlayView
        })}
        <input type="text" class="create-car__input text" placeholder="Car model" value="${carName}">
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