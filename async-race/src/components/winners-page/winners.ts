import { Component, ComponentProps } from '@core/component';
import { WinnersPageView } from '@views/pages/winners-page';

export class WinnersPage extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: WinnersPageView,
    });
  }
}