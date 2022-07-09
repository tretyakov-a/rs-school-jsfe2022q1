import { Component, ComponentProps } from '@core/component';
import { FooterView } from '@views/footer';
import { Header } from './header';
import { Main } from './main';

export class App extends Component {
  constructor(props: ComponentProps, rootSelector: string) {
    super({
      ...props,
      root: rootSelector
    });

    this.components = [
      ['header', Header],
      ['main', Main ],
      ['footer', Component, {
        viewConstructor: FooterView,
      }]
    ];

    this.update();
  }
}

