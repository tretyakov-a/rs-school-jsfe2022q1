import { Component, ComponentProps } from "@core/component";
import { selectFrom } from '@common/utils';
import { CreateCarView } from '@views/pages/garage-page/create-car';
import { EVENT, MIN_CAR_NAME_LENGTH } from '@common/constants';

export type CreateCarProps = ComponentProps & {
  data: {
    carName?: string;
    color?: string;
    buttonContent: string;
    buttonClickEvent: EVENT;
  }
}

export class CreateCar extends Component {
  private inputEl: HTMLInputElement | null;
  private colorPickEl: HTMLInputElement | null;
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
  }

  protected render(): string {
    return super.render({ clickHandler: this.handleCreate, content: this.buttonContent });
  }

  private handleCreate = (e: Event): void => {
    const { carName, color } = this;
    if (carName === '' || carName.length < MIN_CAR_NAME_LENGTH) {
      return this.emit(EVENT.SHOW_ALERT, `Car name length should be >= ${MIN_CAR_NAME_LENGTH}`)
    };
    this.emit(this.buttonClickEvent, { name: carName, color });
  }

  private handleInput = (): void => {
    if (this.inputEl !== null) {
      this.carName = this.inputEl.value;
    }
    if (this.colorPickEl !== null) {
      this.color = this.colorPickEl.value;
    }
  }

  protected afterRender(): void {
    super.afterRender();

    console.log(this.getRoot())
    const inputEl = selectFrom(this.getRoot())('.create-car__input');
    if (inputEl instanceof HTMLInputElement) {
      this.inputEl = inputEl;
      this.inputEl.value = this.carName;
      this.inputEl.addEventListener('input', this.handleInput);
    }
    const colorPickEl = selectFrom(this.getRoot())('.create-car__color-pick');
    if (colorPickEl instanceof HTMLInputElement) {
      this.colorPickEl = colorPickEl;
      this.colorPickEl.value = this.color;
      this.colorPickEl.addEventListener('input', this.handleInput);
    }
  }
}