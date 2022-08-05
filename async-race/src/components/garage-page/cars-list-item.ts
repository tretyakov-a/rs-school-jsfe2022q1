import { Component, ComponentProps } from '@core/component';
import { CarsListItemView } from '@views/pages/garage-page/cars-list-item';
import { CarEntity } from '@common/car';
import { EVENT } from '@common/constants';
import { ComponentWithOverlay } from '@components/component-with-overlay';
import { CarImg } from './car-img';
import { Button } from '@components/button';

export type CarsListItemProps = ComponentProps & {
  data: {
    car: CarEntity;
  }
}

export class CarsListItem extends ComponentWithOverlay {
  public car: CarEntity;
  public carImg: Component | null;
  public buttons: Record<string, Button>;

  constructor(props: CarsListItemProps) {
    super({
      ...props,
      viewConstructor: CarsListItemView,
    });

    const { data } = props;
    if (data === undefined) throw new TypeError();
    this.car = data.car;
    this.carImg = null;
    this.buttons = {};
  }
  
  protected afterRender(): void {
    super.afterRender();
    const carImg = this.getComponent('carImg');
    if (!Array.isArray(carImg) && carImg instanceof CarImg) {
      this.carImg = carImg;
    }
    ['select', 'remove', 'accelerate', 'break'].forEach((name) => {
      const btn = this.getComponent(name);
      if (!Array.isArray(btn) && btn instanceof Button)
        this.buttons[name] = btn;
    });
    this.buttons['break'].disable();
  }

  protected render(): string {
    const {
      car,
      handleSelect,
      handleRemove,
      handleAccelerate,
      handleBreak } = this;
    return super.render({
      car,
      selectHandler: handleSelect,
      removeHandler: handleRemove,
      accelerateHandler: handleAccelerate,
      breakHandler: handleBreak,
    });

  }

  public disableBtns() {
    Object.keys(this.buttons).forEach((key) => this.buttons[key].disable());
  }

  public enableBtns() {
    Object.keys(this.buttons).forEach((key) => this.buttons[key].enable());
  }


  private handleSelect = (): void => {
    this.emit(EVENT.SELECT_CAR, { car: this.car });
  }

  private handleRemove = (): void => {
    this.showOverlay();
    this.disableBtns();

    this.emit(EVENT.TRY_REMOVE_CAR, {
      id: this.car.id, 
      onRemove: (error: Error | null) => {
        if (error !== null) {
          this.hideOverlay();
          this.enableBtns();
        }
      },
    });
  }

  public handleAccelerate = (): void => {
    const { id } = this.car;
    this.emit(EVENT.ACCELERATE_CAR, { id });
  }

  private handleBreak = (): void => {
    const { id } = this.car;
    this.emit(EVENT.BREAK_CAR, { id });
  }
}