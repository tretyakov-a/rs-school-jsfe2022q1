import { Component, ComponentProps } from '@core/component';
import { AppView } from '@views/app';
import { EVENT, CARS_PER_PAGE, carModels, GENERATED_CARS_NUMBER } from '@common/constants';
import { CarEntity, CarData, Car } from '@common/car';
import { CarsData, CarService, ICarService, RaceResults } from '@common/car-service';
import { CarsListItem } from '@components/garage-page/cars-list-item';
import { generateColor, performServiceOperation } from '@common/utils';
import { CarEngineService } from '@common/car-engine-service';

export type AppLoadEventData = {
  cars: CarEntity[];
  carsAmount: number;
  error: Error | null;
  garagePageNumber: number;
  winnersPageNumber: number;
};

export type ServiceOperationCallback = (
  error: Error | null,
  data?: unknown,
) => void;

export type CreateOperationEvent = CustomEvent<{ carData: CarData, onComplete: ServiceOperationCallback }>;

export class App extends Component {
  private cars: Car[];
  private carsData: CarEntity[];
  private carsAmount: number;
  private carsService: ICarService;
  private garagePageNumber: number;
  private winnersPageNumber: number;
  private selectedCarId: string | null;

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
    this.carsData = [];
    this.carsAmount = 0;
    this.carsService = new CarService();
    this.garagePageNumber = 1;
    this.winnersPageNumber = 1;
    this.selectedCarId = null;

    this.on(EVENT.ROUTER_CHANGE_PAGE, this.handlePageChange);
    this.on(EVENT.CARS_AFTER_RENDER, this.handleCarsAfterRender);
    this.on(EVENT.TRY_CREATE_CAR, this.handleTryCreateCar);
    this.on(EVENT.TRY_UPDATE_CAR, this.handleTryUpdateCar);
    this.on(EVENT.SELECT_CAR, this.handleSelectCar);
    this.on(EVENT.TRY_REMOVE_CAR, this.handleTryRemoveCar);
    this.on(EVENT.ACCELERATE_CAR, this.handleCarAccelerate);
    this.on(EVENT.BREAK_CAR, this.handleCarBreak);
    this.on(EVENT.WINNER_FINISH, this.handleFinishRace);

    this.on(EVENT.START_RACE, this.handleStartRace);
    this.on(EVENT.RESET_CARS, this.handleResetCars);

    this.on(EVENT.GARAGE_CHANGE_PAGE, this.handleGarageChangePage);
    this.on(EVENT.GENERATE_CARS, this.handleGenerateCars);

    this.loadData()
      .then(this.handleDataLoad)
      .catch((err: Error) => {
        this.emit(EVENT.SHOW_ALERT, `Error loading data: ${err.message}`);
        this.handleAppLoad(err);
      })

    this.getRoot().insertAdjacentHTML('beforeend', this.render());
    this.afterRender();
  }

  private handleDataLoad = ({ cars, carsAmount }: CarsData) => {
    this.carsData = cars;
    this.carsAmount = carsAmount;
    this.handleAppLoad(null);
  }

  private loadData = async () => {
    return this.carsService.getCars({ _page: this.garagePageNumber, _limit: CARS_PER_PAGE })
  }
  
  private handleAppLoad = async (error: Error | null = null) => {
    const {
      carsData,
      carsAmount,
      garagePageNumber,
      winnersPageNumber
    } = this;
    this.emit(EVENT.LOAD_APP, {
      winnersPageNumber,
      garagePageNumber,
      cars: carsData,
      carsAmount, error,
    });
  }

  private handlePageChange = () => {
    const header = this.getComponent('header');
    if (!Array.isArray(header))
      header.update();

    this.handleAppLoad(null);
  }

  private handleTryCreateCar = async (e: CreateOperationEvent) => {
    const { carData, onComplete } = e.detail;
    const result = await performServiceOperation(
      this.carsService.createCar(carData)
    );
    this.handleDataLoad(await this.loadData());
    onComplete(result instanceof Error ? result : null);
  }

  private handleTryUpdateCar = async (e: CreateOperationEvent) => {
    const { carData, onComplete } = e.detail;
    if (this.selectedCarId === null) {
      return onComplete(null);
    };
    const result = await performServiceOperation(
      this.carsService.updateCar(this.selectedCarId, carData)
    );
    this.handleDataLoad(await this.loadData());
    onComplete(result instanceof Error ? result : null);
    this.selectedCarId = null;
  }

  private handleSelectCar = (e: CustomEvent<{ car: CarEntity}>) => {
    this.selectedCarId = e.detail.car.id;
  }

  private handleTryRemoveCar = async (e: CustomEvent<{ id: string, onRemove: ServiceOperationCallback }>) => {
    const { id, onRemove } = e.detail;
    if (id === this.selectedCarId) {
      this.selectedCarId = null;
    }
    const result = await performServiceOperation(
      this.carsService.deleteCar(id)
    );
    this.handleDataLoad(await this.loadData());
    onRemove(result instanceof Error ? result : null);
  }

  private handleCarsAfterRender = (e: CustomEvent<{ carItems: CarsListItem[] }>) => {
    const { carItems } = e.detail;

    if (carItems.length === 0) return;
    
    if (this.cars.length === carItems.length
      && carItems.every(({ car }, i) => car.id === this.cars[i].carListItem.car.id)) {
      this.cars.forEach((car, i) => {
        car.carListItem = carItems[i];
        // car.updateListItem();
      });
    } else {
      const carEngineService = new CarEngineService();
      this.cars = carItems.map((carItem) => new Car(carItem, carEngineService));
    }
  }

  private handleStartRace = async () => {
    let raceResults: RaceResults = {
      success: true,
    };

    try {
      await Promise.all(this.cars.map((car) => car.tryStartEngine()));
      const carPromises = this.cars.map((car) => car.tryStartDrive());
      Promise.allSettled(carPromises)
        .then((data) => {
          this.emit(EVENT.RACE_END, data);
        })
      raceResults = await Promise.any(carPromises);
    } catch (error) {
      raceResults.success = false;
    } finally {
      this.emit(EVENT.WINNER_FINISH, raceResults);
      const car = this.cars.find((car) => car.carListItem.car.id === raceResults.id);
      if (car) { 
        car.handleWin();
      }
    }
  }

  private handleFinishRace = async (e: CustomEvent<RaceResults>) => {
    this.emit(EVENT.SHOW_ALERT, `${JSON.stringify(e.detail)}`);
  }
  
  private handleResetCars = () => {
    this.cars.forEach((car) => {
      car.reset();
    })
  }

  public handleCarAccelerate = async (e: CustomEvent<{id: string}>): Promise<void> => {
    const { id } = e.detail;
    const car = this.cars.find((car) => car.carListItem.car.id === id);
    if (!car) return;
    try {
      await car.tryStartEngine();
      await car.tryStartDrive();
    } catch (error) {
      this.emit(EVENT.SHOW_ALERT, `${error}`);
    }
  }

  private handleCarBreak = (e: CustomEvent<{id: string}>): void => {
    const { id } = e.detail;
    const car = this.cars.find((car) => car.carListItem.car.id === id);
    if (!car) return;
    car.rejectDrivePromise?.('Manual break');
    car.rejectDrivePromise = null;
    car.reset();
  }

  private handleGarageChangePage = async (e: CustomEvent<{ pageNumber: number }>) => {
    const { pageNumber } = e.detail;
    this.garagePageNumber = pageNumber;
    this.handleDataLoad(await this.loadData());
  }

  private handleGenerateCars = async (e: CustomEvent<{ onComplete: ServiceOperationCallback }>) => {
    const { onComplete } = e.detail;
    const carsPromises = Array.from({ length: GENERATED_CARS_NUMBER }, (_, i) => {
      const modelIndex = Math.floor(Math.random() * carModels.length);
      return performServiceOperation(
        this.carsService.createCar({
          name: carModels[modelIndex],
          color: generateColor(),
        })
      )
    });
    try {
      await Promise.allSettled(carsPromises);
      this.handleDataLoad(await this.loadData());
      onComplete(null);
    } catch (error) {
      if (error instanceof Error)
        onComplete(error);
    }
  }
}
