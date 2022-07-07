import { Component } from '@core/component';
import { View } from '@core/view';
import { FooterView } from '@views/footer';
import { HeaderView } from '@views/header';
import Main from './main';

class App extends Component {
  constructor(rootSelector: string) {
    super({
      view: new View({
        root: rootSelector,
      }),
    });

    this.components = {
      header: new Component({
        view: new HeaderView(),
      }),
      main: new Main(),
      footer: new Component({
        view: new FooterView(),
      })
    }
  }
}

export default App;
