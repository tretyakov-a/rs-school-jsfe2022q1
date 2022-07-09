import { Component, ComponentProps } from '@core/component';
import { HeaderView } from '@views/header';
import { CartBtn } from './cart-btn';

export class Header extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: HeaderView,
    });

    this.components = [
      ['cartBtn', CartBtn]
    ];

    this.update();
  }
}

