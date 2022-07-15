import { DISPLAY_OPTION, DISPLAY_OPTION_DEFAULT } from '@common/constants';
import { Component, ComponentProps } from '@core/component';
import { SORT } from '@common/sorting';
import { IStorageService, LocalStorageService } from '@common/storage-service';


export type AppState = {
  productInCartIds: string[];
  sort: SORT;
  filterStates: Record<string, unknown>;
  appearance: {
    filters: Record<string, {
      isExpanded: boolean;
    }>;
    displayOption: DISPLAY_OPTION;
  }
}

export class AppStateProcessor extends Component {
  protected state: AppState;
  private storageService: IStorageService<AppState>;

  static defaultState: AppState = {
    productInCartIds: [],
    sort: SORT.TITLE_ASC,
    filterStates: {},
    appearance: {
      filters: {},
      displayOption: DISPLAY_OPTION_DEFAULT,
    }
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

