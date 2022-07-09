import { Component, ComponentProps } from '@core/component';
import { FooterView } from '@views/footer';
import { HeaderView } from '@views/header';
import Main from './main';

class App extends Component {
  constructor(props: ComponentProps, rootSelector: string) {
    super({
      ...props,
      root: rootSelector
    });

    this.components = [
      ['header', Component, {
        viewConstructor: HeaderView
      }],
      [ 'main', Main ],
      [ 'footer', Component, {
        viewConstructor: FooterView,
      }]
    ];

    this.update();
  }
}

export default App;
