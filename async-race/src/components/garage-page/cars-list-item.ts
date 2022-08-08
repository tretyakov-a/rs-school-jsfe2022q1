import { Component, ComponentProps } from '@core/component';
import { CarsListItemView } from '@views/pages/garage-page/cars-list-item';
import { CarEntity } from '@common/car';
import { EVENT } from '@common/constants';
import { ComponentWithOverlay } from '@components/component-with-overlay';
import { CarImg } from './car-img';
import { Button } from '@components/button';
import { selectFrom } from '@common/utils';

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

    this.on(EVENT.START_RACE, this.handleStartRace);
    this.on(EVENT.RACE_END, this.handleEndRace);
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

  public handleFinish(time: number) {
    this.getRoot().classList.add('car_finisher');
    selectFrom(this.getRoot())('.car__finish-time').textContent = `${time} s.`;
  }

  public handleWin(time: number) {
    this.getRoot().classList.add('car_winner');
    selectFrom(this.getRoot())('.car__finish-time').textContent = `${time} s.`;
  }

  public reset() {
    this.getRoot().classList.remove('car_winner');
    this.getRoot().classList.remove('car_finisher');
    this.buttons['accelerate'].enable();
    this.buttons['break'].disable();
    if (this.carImg !== null)
      this.carImg.getRoot().classList.remove('car-img_broken');
  }

  private setButtons = (state: 'enable' | 'disable') => {
    this.buttons['select'][state]();
    this.buttons['remove'][state]();
  }

  private handleStartRace = () => {
    this.setButtons('disable')
  }

  private handleEndRace = () => {
    this.setButtons('enable');
  }
}