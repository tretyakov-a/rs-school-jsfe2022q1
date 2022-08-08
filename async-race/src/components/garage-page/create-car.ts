import { ComponentProps } from "@core/component";
import { selectFrom } from '@common/utils';
import { CreateCarView } from '@views/pages/garage-page/create-car';
import { EVENT, MIN_CAR_NAME_LENGTH, DEFAULT_FORM_DATA } from '@common/constants';
import { CarEntity} from '@common/car';
import { ComponentWithOverlay } from "@components/component-with-overlay";
import { Button } from "@components/button";
import { AppLoadEventData } from "@components/app";

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
    this.carName = data.carName || DEFAULT_FORM_DATA.name;
    this.color = data.color || DEFAULT_FORM_DATA.color;
    this.buttonContent = data.buttonContent;
    this.buttonClickEvent = data.buttonClickEvent;
    this.button = null;
    
    if (this.isUpdateForm()) {
      this.on(EVENT.SELECT_CAR, this.handleSelect);
    }

    this.on(EVENT.LOAD_APP, this.handleAppLoad);
  }

  protected render(): string {
    return super.render(this);
  }

  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    const { selectedCarId, createCarData, updateCarData } = e.detail;
    const data = this.buttonContent === 'Create'
    ? createCarData
    : updateCarData;
    
    if (this.inputEl !== null) {
      this.inputEl.value = data.name;
    }
    if (this.colorPickEl !== null) {
      this.colorPickEl.value = data.color;
    }
    if (selectedCarId !== null && this.isUpdateForm())
      this.button?.enable();
    this.handleInput();
  }
  
  private isUpdateForm(): boolean {
    return this.buttonClickEvent === EVENT.TRY_UPDATE_CAR;
  }

  private setDefault() {
    this.carName = DEFAULT_FORM_DATA.name;
    this.color = DEFAULT_FORM_DATA.color;
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
        this.updateAppData();
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
    this.updateAppData();
  }

  private updateAppData() {
    this.emit(EVENT.UPDATE_CAR_FORM_DATA, {
      form: this.buttonContent,
      data: { name: this.carName, color: this.color },
    })
  }

  private handleSelect = (e: CustomEvent<{ car: CarEntity}>) => {
    const { name, color } = e.detail.car;
    if (this.inputEl !== null) {
      this.inputEl.value = name;
    }
    if (this.colorPickEl !== null) {
      this.colorPickEl.value = color;
    }
    this.handleInput();
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