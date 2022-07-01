import { SourceData } from '@components/sources';
import AppController from '../controller/controller';
import DummyAppController from '../controller/dummy-controller';
import { Filter } from './filter';
import { Component } from './component';
import { Header } from './header';
import { Main } from './main';
import { FooterView } from '@views/footer';
import { View } from '@views/view';

class App extends Component<void> {
  private readonly controller: AppController;

  constructor(rootSelector: string) {
    super({
      view: new View<void>({
        root: rootSelector,
      }),
    });
    // this.controller = new DummyAppController();
    this.controller = new AppController();
    this.components = {
      header: new Header({
        onFilterChange: this.handleFilterChange
      }),
      main: new Main(
        this.controller, 
        {
          onSourcesLoad: this.handleSourcesLoad,
        }
      ),
      footer: new Component({
        view: new FooterView()
      })
    }
  }

  private handleSourcesLoad = (sources: SourceData[]): void => {
    this.components.header
      .dispatchEvent(new CustomEvent('onSourcesLoad', { detail: sources }));
  }

  private handleFilterChange = (filters: Filter[]): void => {
    this.components.main
      .dispatchEvent(new CustomEvent('onFilterChange', { detail: filters }));
  }
}

export default App;
