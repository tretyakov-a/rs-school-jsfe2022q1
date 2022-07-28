import { ComponentProps } from '@core/component';
import { AppState, AppStateProcessor } from './app-state';
import { AppView } from '@views/app';
import { EVENT } from '@common/constants';

export type AppLoadEventData = {
  state: AppState;
  error: Error | null;
};

export class App extends AppStateProcessor {

  constructor(props: ComponentProps) {
    const root = document.createElement('div');
    root.setAttribute('id', 'app');
    document.body.append(root);

    super({
      ...props,
      viewConstructor: AppView,
      viewOptions: {
        root,
      }
    });

    this.on(EVENT.CHANGE_PAGE, this.handlePageChange);

    // this.productsService.load()
    //   .then(this.handleDataLoad)
    //   .then(this.handleStateLoad)
    //   .catch((err: Error) => {
    //     this.emit(EVENT.SHOW_ALERT, `Ошибка при загрузке данных: ${err.message}`);
    //     this.handleAppLoad(err);
    //   })

    setTimeout(() => {
      this.handleStateLoad(null);
    }, 500);

    this.getRoot().insertAdjacentHTML('beforeend', this.render());
    this.afterRender();
  }


  private handleDataLoad = async (data: unknown) => {

    return this.loadState();
  }

  
  private handleAppLoad = async (error: Error | null = null) => {
    
    this.emit(EVENT.LOAD_APP, { state: this.state, error });
  }

  private handleStateLoad = async (state: AppState | null): Promise<void> => {
    if (state === null) {
      this.saveState();
    } else {
      this.state = state;
    }

    this.handleAppLoad(null);
  }

  private handlePageChange = () => {
    const header = this.getComponent('header');
    if (!Array.isArray(header))
      header.update();
    this.emit(EVENT.LOAD_APP, { state: this.state, error: null });
  }

}
