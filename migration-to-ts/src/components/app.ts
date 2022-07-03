import { SourceData } from '@components/sources';
import AppController from '../controller/controller';
// import DummyAppController from '../controller/dummy-controller';
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
    (this.components.header as Header).handleSourcesLoad(sources);
  }

  private handleFilterChange = (filters: Filter[]): void => {
    (this.components.main as Main).handleFilterChange(filters);
  }
}

export default App;
