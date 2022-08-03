import { ComponentProps } from '@core/component';
import { CarsListItemView } from '@views/pages/garage-page/cars-list-item';
import { Car } from '@common/car';
import { EVENT } from '@common/constants';
import { ComponentWithOverlay } from '@components/component-with-overlay';

type CarsListItemProps = ComponentProps & {
  data: {
    car: Car;
  }
}
export class CarsListItem extends ComponentWithOverlay {
  private car: Car;

  constructor(props: CarsListItemProps) {
    super({
      ...props,
      viewConstructor: CarsListItemView,
    });

    const { data } = props;
    if (data === undefined) throw new TypeError();
    this.car = data.car;
  }
  
  protected render(): string {
    return super.render(this);
  }

  private selectHandler = (): void => {
    this.emit(EVENT.SELECT_CAR, { car: this.car });
  }

  private removeHandler = (): void => {
    this.showOverlay();

    this.emit(EVENT.TRY_REMOVE_CAR, {
      id: this.car.id, 
      onRemove: (error: Error | null) => {
        if (error !== null) {
          this.hideOverlay();
        }
      },
    });
  }

  private accelerateHandler = (): void => {
    this.emit(EVENT.ACCELERATE_CAR, { id: this.car.id });
  }

  private breakHandler = (): void => {
    this.emit(EVENT.BREAK_CAR, { id: this.car.id });
  }
}