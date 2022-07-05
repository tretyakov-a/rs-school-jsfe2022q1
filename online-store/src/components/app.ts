import { Component } from '@core/component';
import { View } from '@core/view';
import { SpinnerView } from '@views/spinner';

class App extends Component<void> {
  constructor(rootSelector: string) {
    super({
      view: new View<void>({
        root: rootSelector,
      }),
    });

    this.update((new SpinnerView()).render());
  }
}

export default App;
