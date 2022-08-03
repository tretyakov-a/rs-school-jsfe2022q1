import { Component, ComponentProps } from '@core/component';
import { GaragePageView } from '@views/pages/garage-page';

export class GaragePage extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: GaragePageView,
    });

  }
}