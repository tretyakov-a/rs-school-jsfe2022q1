import { Component, ComponentProps } from '@core/component';
import { CarsListItemView } from '@views/pages/garage-page/cars-list-item';
import { Car } from '@common/car';

type CarsListItemProps = ComponentProps & {
  data: {
    car: Car;
  }
}
export class CarsListItem extends Component {
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
    return super.render({ car: this.car });
  }

}