import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesEl = document.querySelector('.sources') as HTMLElement;
    
    sourcesEl.addEventListener('click', (e): void => {
      this.controller.getNews(e, (data) => this.view.drawNews(data))
    });

    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
