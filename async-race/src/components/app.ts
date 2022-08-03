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

export type ServiceOperationCallback = (
  error: Error | null,
  data?: unknown,
) => void;

export type CreateOperationEvent = CustomEvent<{ carData: CarData, onComplete: ServiceOperationCallback }>;

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
    this.on(EVENT.TRY_CREATE_CAR, this.handleTryCreateCar);
    this.on(EVENT.TRY_UPDATE_CAR, this.handleTryUpdateCar);
    this.on(EVENT.SELECT_CAR, this.handleSelectCar);
    this.on(EVENT.TRY_REMOVE_CAR, this.handleTryRemoveCar);

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
    this.saveState();
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

  private async performServiceOperation(
    opResult: Promise<void>, 
    onComplete: ServiceOperationCallback = () => {}
  ): Promise<void> {
    let err: Error | null = null;
    try {
      await opResult;
      this.handleDataLoad(await this.loadData());
    } catch (error) {
      if (error instanceof Error) {
        err = error;
        this.emit(EVENT.SHOW_ALERT, error.message);
      }
    } finally {
      onComplete(err);
    }
  }

  private handleTryCreateCar = async (e: CreateOperationEvent) => {
    const { carData, onComplete } = e.detail;
    await this.performServiceOperation(
      this.carService.createCar(carData), onComplete
    );
  }

  private handleTryUpdateCar = async (e: CreateOperationEvent) => {
    const { carData, onComplete } = e.detail;
    if (this.state.selectedCarId === null) {
      return onComplete(null);
    };
    await this.performServiceOperation(
      this.carService.updateCar(this.state.selectedCarId, carData), onComplete
    );
  }

  private handleSelectCar = (e: CustomEvent<{ car: Car }>) => {
    this.state.selectedCarId = e.detail.car.id;
    this.saveState();
  }

  private handleTryRemoveCar = async (e: CustomEvent<{ id: string, onRemove: ServiceOperationCallback }>) => {
    const { id, onRemove } = e.detail;
    if (id === this.state.selectedCarId) {
      this.state.selectedCarId = null;
    }
    await this.performServiceOperation(
      this.carService.deleteCar(id), onRemove
    );

  }
}
