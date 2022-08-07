import { Component, ComponentProps } from "@core/component";
import { selectFrom } from '@common/utils';
import { CreateCarView } from '@views/pages/garage-page/create-car';
import { EVENT, MIN_CAR_NAME_LENGTH } from '@common/constants';
import { CarEntity} from '@common/car';
import { ComponentWithOverlay } from "@components/component-with-overlay";
import { Button } from "@components/button";

export type CreateCarProps = ComponentProps & {
  data: {
    carName?: string;
    color?: string;
    buttonContent: string;
    buttonClickEvent: EVENT;
  }
}

export class CreateCar extends ComponentWithOverlay {
  private inputEl: HTMLInputElement | HTMLSelectElement | null;
  private colorPickEl: HTMLInputElement | null;
  private button: Button | null;
  private carName: string;
  private color: string;
  private buttonContent: string;
  private buttonClickEvent: EVENT;

  constructor(props: CreateCarProps) {
    super({
      ...props,
      viewConstructor: CreateCarView
    });

    const { data } = props;
    if (data === undefined) throw new TypeError();
    this.inputEl = null;
    this.colorPickEl = null;
    this.carName = data.carName || '';
    this.color = data.color || '#000000';
    this.buttonContent = data.buttonContent;
    this.buttonClickEvent = data.buttonClickEvent;
    this.button = null;
    
    if (this.isUpdateForm()) {
      this.on(EVENT.SELECT_CAR, this.handleSelect);
    }
  }

  protected render(): string {
    return super.render(this);
  }

  private isUpdateForm(): boolean {
    return this.buttonClickEvent === EVENT.TRY_UPDATE_CAR;
  }

  private setDefault() {
    this.carName = '';
    this.color = '#000000';
    if (this.inputEl) this.inputEl.value = this.carName;
    if (this.colorPickEl) this.colorPickEl.value = this.color;
  }
  
  private handleClick = (e: Event): void => {
    const { carName, color } = this;
    if (carName === '' || carName.length < MIN_CAR_NAME_LENGTH) {
      return this.emit(EVENT.SHOW_ALERT, `Car name length should be >= ${MIN_CAR_NAME_LENGTH}`)
    };
    this.showOverlay();
    this.emit(this.buttonClickEvent, {
      carData: { name: carName, color },
      onComplete: () => {
        this.setDefault();
        this.hideOverlay();
        if (this.isUpdateForm()) this.button?.disable();
      }
    });
  }

  private handleInput = (): void => {
    if (this.inputEl !== null) {
      this.carName = this.inputEl.value;
    }
    if (this.colorPickEl !== null) {
      this.color = this.colorPickEl.value;
    }
  }

  private handleSelect = (e: CustomEvent<{ car: CarEntity}>) => {
    const { name, color } = e.detail.car;
    this.carName = name;
    this.color = color;
    this.update(this);
    if (this.isUpdateForm()) this.button?.enable();
  }

  protected afterRender(): void {
    super.afterRender();

    const inputEl = selectFrom(this.getRoot())('.create-car__input');
    if (inputEl instanceof HTMLInputElement || inputEl instanceof HTMLSelectElement) {
      this.inputEl = inputEl;
      this.inputEl.addEventListener('input', this.handleInput);
    }
    const colorPickEl = selectFrom(this.getRoot())('.create-car__color-pick');
    if (colorPickEl instanceof HTMLInputElement) {
      this.colorPickEl = colorPickEl;
      this.colorPickEl.addEventListener('change', this.handleInput);
    }
    const button = this.getComponent('button');
    if (!Array.isArray(button) && button instanceof Button) {
      this.button = button;
      if (this.isUpdateForm()) this.button.disable();
    }
  }
}