import { Component, ComponentProps } from '@core/component';
import { CarImgView } from '@views/car-img';

export class CarImg extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: CarImgView,
    });
  }

}