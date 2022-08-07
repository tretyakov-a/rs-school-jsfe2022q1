import { Component, ComponentProps } from '@core/component';
import { IStorageService, LocalStorageService } from '@common/storage-service';

export type AppState = {
  selectedCarId: string | null;
}

export class AppStateProcessor extends Component {
  protected state: AppState;
  private storageService: IStorageService<AppState>;

  static defaultState: AppState = {
    selectedCarId: null,
  }

  constructor(props: ComponentProps) {
    super(props);

    this.storageService = new LocalStorageService<AppState>('appState');
    this.state = this.getDefaultState();

    window.addEventListener('beforeunload', this.saveState);
  }
  
  protected async loadState(): Promise<AppState | null> {
    return await this.storageService.load();
  }

  protected saveState = async (): Promise<void> => {
    this.storageService.save(this.state);
  }

  protected getDefaultState(): AppState {
    return JSON.parse(JSON.stringify(AppStateProcessor.defaultState));
  }
}

