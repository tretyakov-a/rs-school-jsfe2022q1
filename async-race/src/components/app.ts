import { ComponentProps } from '@core/component';
import { AppState, AppStateProcessor } from './app-state';
import { AppView } from '@views/app';
import { EVENT, CARS_PER_PAGE } from '@common/constants';
import { Car, CarData } from '@common/car';
import { CarsData, CarService, ICarService } from '../common/car-service';

export type AppLoadEventData = {
  cars: Car[];
  carsAmount: number;
  state: AppState;
  error: Error | null;
};

export class App extends AppStateProcessor {
  private cars: Car[];
  private carsAmount: number;
  private carService: ICarService;

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
    
    this.cars = [];
    this.carsAmount = 0;
    this.carService = new CarService();

    this.on(EVENT.CHANGE_PAGE, this.handlePageChange);
    this.on(EVENT.CREATE_CAR, this.handleCreateCar);

    this.loadState()
      .then(this.handleStateLoad)
      .then(this.handleDataLoad)
      .catch((err: Error) => {
        this.emit(EVENT.SHOW_ALERT, `Error loading data: ${err.message}`);
        this.handleAppLoad(err);
      })

    this.getRoot().insertAdjacentHTML('beforeend', this.render());
    this.afterRender();
  }

  private handleDataLoad = ({ cars, carsAmount }: CarsData) => {
    this.cars = cars;
    this.carsAmount = carsAmount;
    this.handleAppLoad(null);
  }

  private loadData = async () => {
    return this.carService.getCars({ _page: this.state.pageNumber, _limit: CARS_PER_PAGE });
  }
  
  private handleAppLoad = async (error: Error | null = null) => {
    const { cars, carsAmount, state } = this;
    this.emit(EVENT.LOAD_APP, { cars, carsAmount, state, error });
  }

  private handleStateLoad = async (state: AppState | null): Promise<CarsData> => {
    if (state === null) {
      this.saveState();
    } else {
      this.state = state;
    }

    return this.loadData();
  }

  private handlePageChange = () => {
    const { cars, carsAmount, state } = this;
    const header = this.getComponent('header');
    if (!Array.isArray(header))
      header.update();
    this.emit(EVENT.LOAD_APP, { cars, carsAmount, state, error: null });
  }

  private handleCreateCar = async (e: CustomEvent<CarData>) => {
    const carData = e.detail;
    try {
      await this.carService.createCar(carData);
      this.handleDataLoad(await this.loadData());
    } catch (error) {
      if (error instanceof Error) {
        this.emit(EVENT.SHOW_ALERT, error.message);
      }
    }
  }
}
