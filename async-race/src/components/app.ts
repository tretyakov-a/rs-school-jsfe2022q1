import { Component, ComponentProps } from '@core/component';
import { AppView } from '@views/app';
import { EVENT, ITEMS_PER_PAGE, carModels, GENERATED_CARS_NUMBER, MAX_ONE_TIME_REQUESTS } from '@common/constants';
import { CarEntity, CarData, Car, ENGINE_STATUS } from '@common/car';
import { CarsData, CarService, ICarService, RaceResults, SortOrder, WinnersSortType } from '@common/car-service';
import { CarsListItem } from '@components/garage-page/cars-list-item';
import { generateColor, performServiceOperation } from '@common/utils';
import { CarEngineService } from '@common/car-engine-service';
import { ICarWinnersService } from '@common/car-winners-service';
import { CarWinnersService } from '../common/car-winners-service';
import { SortState, WinnersLoadEventData } from './winners-page/winners-table';

export type AppLoadEventData = {
  cars: CarEntity[];
  carsAmount: number;
  error: Error | null;
  garagePageNumber: number;
  isRaceInProgress: boolean;
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
  private winnersService: ICarWinnersService;
  private garagePageNumber: number;
  private winnersPageNumber: number;
  private sort: SortState | null;
  private selectedCarId: string | null;
  private isRaceInProgress: boolean;
  private isWinnerFinished: boolean;

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
    this.winnersService = new CarWinnersService();
    this.garagePageNumber = 1;
    this.winnersPageNumber = 1;
    this.sort = null;
    this.selectedCarId = null;
    this.isRaceInProgress = false;
    this.isWinnerFinished = false;

    this.on(EVENT.ROUTER_CHANGE_PAGE, this.handlePageChange);
    this.on(EVENT.CARS_AFTER_RENDER, this.handleCarsAfterRender);
    this.on(EVENT.TRY_CREATE_CAR, this.handleTryCreateCar);
    this.on(EVENT.TRY_UPDATE_CAR, this.handleTryUpdateCar);
    this.on(EVENT.SELECT_CAR, this.handleSelectCar);
    this.on(EVENT.TRY_REMOVE_CAR, this.handleTryRemoveCar);
    this.on(EVENT.ACCELERATE_CAR, this.handleCarAccelerate);
    this.on(EVENT.BREAK_CAR, this.handleCarBreak);
    this.on(EVENT.GET_WINNERS, this.handleLoadWinners);
    this.on(EVENT.WINNERS_CHANGE_PAGE, this.handleWinnersChangePage);

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
    return this.carsService.getCars({ _page: this.garagePageNumber, _limit: ITEMS_PER_PAGE.GARAGE })
  }
  
  private handleAppLoad = async (error: Error | null = null) => {
    const {
      carsData,
      carsAmount,
      garagePageNumber,
      isRaceInProgress,
    } = this;
    this.emit(EVENT.LOAD_APP, {
      isRaceInProgress,
      garagePageNumber,
      cars: carsData,
      carsAmount, error,
    });
  }

  private handlePageChange = (e: CustomEvent<{ activePage: string }>) => {
    const { activePage } = e.detail;
    const header = this.getComponent('header');
    if (!Array.isArray(header))
      header.update(activePage);

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
    await performServiceOperation(
      this.winnersService.deleteWinner(id)
    )
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
      });
    } else {
      const carEngineService = new CarEngineService();
      this.cars = carItems.map((carItem) => new Car(carItem, carEngineService, this.handleFinishRace));
    }
  }

  private handleStartRace = async () => {
    this.isWinnerFinished = false;
    this.isRaceInProgress = true;
    let raceResults: RaceResults = {
      success: true,
    };
    let carPromises: Promise<RaceResults>[] = [];
    let startTime = 0;
    let delayTime = 0;
    try {
      await Promise.all(this.cars.map((car) => car.tryStartEngine()));
      carPromises = this.cars.map((car, index) => car.tryStartDrive(index));
      
      startTime = Date.now();
      Promise.allSettled(carPromises)
        .then((data) => {
          setTimeout(() => {
            this.emit(EVENT.RACE_END, data);
            this.isRaceInProgress = false;
          }, delayTime);
        });
       
      if (carPromises.length > MAX_ONE_TIME_REQUESTS) {
        raceResults = await Promise.race(carPromises);
      }
    } catch (error) {
      raceResults.success = false;
    } finally {
      delayTime = carPromises.length > MAX_ONE_TIME_REQUESTS ? Date.now() - startTime : 0;
      this.cars.forEach((car) => car.startDrive(delayTime));
    }
  }

  private handleFinishRace = async (id: string, time: number, onWin: (isWinner: boolean) => void) => {
    // const { id, time, onWin } = e.detail;
    if (this.isWinnerFinished || !this.isRaceInProgress) return onWin(false);
    this.isWinnerFinished = true;
    onWin(true);
    if (id === undefined || time === undefined) return;
    let res = await performServiceOperation(this.winnersService.getWinner(id))
    if (res instanceof Error) {
      performServiceOperation(this.winnersService.createWinner({ id, wins: 1, time }));
    } else if (res !== null) {
      const newTime = time < res.time ? time : res.time;
      const wins = res.wins + 1;
      performServiceOperation(this.winnersService.updateWinner(id, { wins, time: newTime }));
    }
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
      car.startDrive();
      await car.tryStartDrive();
    } catch (error) {
      // this.emit(EVENT.SHOW_ALERT, `${error}`);
      car.handleEngineBroke();
    }
  }

  private handleCarBreak = (e: CustomEvent<{id: string}>): void => {
    const { id } = e.detail;
    const car = this.cars.find((car) => car.carListItem.car.id === id);
    if (!car) return;
    car.rejectDrivePromise?.('Manual break');
    car.rejectDrivePromise = null;
    if (car.status === ENGINE_STATUS.STOPPED
        || car.status === ENGINE_STATUS.BROKEN)
      car.reset();
    car.isHandBreak = true;
  }

  private handleGarageChangePage = async (e: CustomEvent<{ pageNumber: number }>) => {
    const { pageNumber } = e.detail;
    this.garagePageNumber = pageNumber;
    this.handleDataLoad(await this.loadData());
  }

  private handleWinnersChangePage = async (e: CustomEvent<{ pageNumber: number }>) => {
    const { pageNumber } = e.detail;
    this.winnersPageNumber = pageNumber;
    this.handleLoadWinners();
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

  private handleLoadWinners = async (e?: CustomEvent<SortState>) => {
    if (e?.detail) this.sort = e.detail;
    const sortParams = this.sort !== null
      ? {
        _sort: this.sort.type,
        _order: this.sort.order,
      }
      : {};
    try {
      const result = await this.winnersService.getWinners({
        _page: this.winnersPageNumber,
        _limit: ITEMS_PER_PAGE.WINNERS,
        ...sortParams,
      });
      const { isRaceInProgress, winnersPageNumber } = this;
      const cars = await Promise.all(result.winners.map(({ id }) => this.carsService.getCar(id)));
      const carsData = cars.reduce((acc: Record<string, CarData>, car) => {
        const { id, name, color } = car;
        return { ...acc, [id]: { name, color }};
      }, {});
      this.emit(EVENT.LOAD_WINNERS, { ...result, sort: this.sort, carsData, isRaceInProgress, winnersPageNumber });
    } catch (error) {
      this.emit(EVENT.LOAD_WINNERS, { error });
    }
  }
}
