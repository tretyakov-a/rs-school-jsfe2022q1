import { Component, ComponentProps } from '@core/component';
import { AppView } from '@views/app';
import { 
  EVENT, ITEMS_PER_PAGE,
  carModels,
  GENERATED_CARS_NUMBER,
  MAX_ONE_TIME_REQUESTS,
  carBrands,
  DEFAULT_FORM_DATA } from '@common/constants';
import { CarEntity, CarData, Car, ENGINE_STATUS } from '@common/car';
import { CarService, ICarService, RaceResults } from '@common/car-service';
import { CarsListItem } from '@components/garage-page/cars-list-item';
import { generateColor, performServiceOperation } from '@common/utils';
import { CarEngineService, ICarEngineService } from '@common/car-engine-service';
import { ICarWinnersService } from '@common/car-winners-service';
import { CarWinnersService } from '../common/car-winners-service';
import { SortState } from './winners-page/winners-table';

export type AppState = {
  cars: CarEntity[];
  carsAmount: number;
  garagePageNumber: number;
  isRaceInProgress: boolean;
  createCarData: CarData;
  updateCarData: CarData;
  selectedCarId: string | null;
}

export type AppLoadEventData = AppState & {
  error: Error | null;
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
  private carEngineService: ICarEngineService;
  private garagePageNumber: number;
  private winnersPageNumber: number;
  private sort: SortState | null;
  private selectedCarId: string | null;
  private isRaceInProgress: boolean;
  private isWinnerFinished: boolean;
  private createCarData: CarData;
  private updateCarData: CarData;

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
    this.carEngineService = new CarEngineService();
    this.garagePageNumber = 1;
    this.winnersPageNumber = 1;
    this.sort = null;
    this.selectedCarId = null;
    this.isRaceInProgress = false;
    this.isWinnerFinished = false;
    this.createCarData = DEFAULT_FORM_DATA;
    this.updateCarData = DEFAULT_FORM_DATA;

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
    this.on(EVENT.UPDATE_CAR_FORM_DATA, this.handleUpdateCarFormData);
    this.on(EVENT.GET_APP_STATE, this.handleGetAppState);

    this.on(EVENT.START_RACE, this.handleStartRace);
    this.on(EVENT.RESET_CARS, this.handleResetCars);

    this.on(EVENT.GARAGE_CHANGE_PAGE, this.handleGarageChangePage);
    this.on(EVENT.GENERATE_CARS, this.handleGenerateCars);

    this.loadData()

    this.getRoot().insertAdjacentHTML('beforeend', this.render());
    this.afterRender();
  }

  private loadData = async () => {
    try {
      const { cars, carsAmount } =  await this.carsService.getCars({
        _page: this.garagePageNumber,
        _limit: ITEMS_PER_PAGE.GARAGE
      });
      this.carsData = cars;
      this.carsAmount = carsAmount;
      this.handleAppLoad(null);
    } catch (error) {
      if (error instanceof Error)
        this.handleAppLoad(error);
    }
  }
  
  private getState(): AppState {
    const {
      carsData,
      carsAmount,
      garagePageNumber,
      isRaceInProgress,
      createCarData, updateCarData, selectedCarId
    } = this;
    return {
      isRaceInProgress,
      garagePageNumber,
      cars: carsData,
      carsAmount,
      createCarData, updateCarData, selectedCarId
    }
  }

  private handleGetAppState = (e: CustomEvent<{ onComplete: (state: AppState) => void} >) => {
    const { onComplete } = e.detail;
    onComplete(this.getState());
  }

  private handleAppLoad = async (error: Error | null = null) => {
    this.emit(EVENT.LOAD_APP, { ...this.getState(), error });
  }

  private handlePageChange = async (e: CustomEvent<{ activePage: string }>) => {
    const { activePage } = e.detail;
    const header = this.getComponent('header');
    if (!Array.isArray(header))
      header.update(activePage);

    if (this.cars.length === 0) {

      await this.loadData();
    } else {
      this.handleAppLoad(null);
    }
  }

  private handleUpdateCarFormData = (e: CustomEvent<{ form: 'Create' | 'Update', data: CarData }>) => {
    const { form, data } = e.detail;
    if (form === 'Create') {
      this.createCarData = data;
    } else {
      this.updateCarData = data;
    }
  }

  private handleTryCreateCar = async (e: CreateOperationEvent) => {
    const { carData, onComplete } = e.detail;
    const result = await performServiceOperation(
      this.carsService.createCar(carData)
    );
    await this.loadData();
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
    await this.loadData();
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
    await this.loadData();
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
      this.cars = carItems.map((carItem) => new Car(carItem, this.carEngineService, this.handleFinishRace));
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
  
  private handleResetCars = async (e: CustomEvent<{ onComplete: ServiceOperationCallback }>) => {
    const { onComplete } = e.detail;
    const promises = this.cars.map((car) => performServiceOperation(
      this.carEngineService.switchEngine(car.carListItem.car.id, ENGINE_STATUS.STOPPED)
    ))
    try {
      await Promise.all(promises);
      onComplete(null);
    } catch (error) {
      if (error instanceof Error)
        onComplete(error);
    } finally {
      this.cars.forEach((car) => {
        car.reset();
      })
    }
  }

  public handleCarAccelerate = async (e: CustomEvent<{id: string}>): Promise<void> => {
    if (this.isRaceInProgress) return;
    const { id } = e.detail;
    const car = this.cars.find((car) => car.carListItem.car.id === id);
    if (!car) return;
    try {
      await car.tryStartEngine();
      car.startDrive();
      await car.tryStartDrive();
    } catch (error) {
      car.handleEngineBroke();
    }
  }

  private handleCarBreak = async (e: CustomEvent<{ id: string, onComplete: ServiceOperationCallback }>) => {
    const { id, onComplete } = e.detail;
    const car = this.cars.find((car) => car.carListItem.car.id === id);
    if (!car) return;

    try {
      car.isHandBreak = true;
      await performServiceOperation(
        this.carEngineService.switchEngine(id, ENGINE_STATUS.STOPPED)
      )
      onComplete(null);
    } catch (error) {
      if (error instanceof Error) onComplete(error)
    } finally {
      car.rejectDrivePromise?.('Manual break');
      car.rejectDrivePromise = null;
      if (car.status === ENGINE_STATUS.STOPPED
          || car.status === ENGINE_STATUS.BROKEN)
        car.reset();
    }
  }

  private handleGarageChangePage = async (e: CustomEvent<{ pageNumber: number }>) => {
    const { pageNumber } = e.detail;
    this.garagePageNumber = pageNumber;
    await this.loadData();
  }

  private handleWinnersChangePage = async (e: CustomEvent<{ pageNumber: number }>) => {
    const { pageNumber } = e.detail;
    this.winnersPageNumber = pageNumber;
    this.handleLoadWinners();
  }

  private handleGenerateCars = async (e: CustomEvent<{ onComplete: ServiceOperationCallback }>) => {
    const { onComplete } = e.detail;
    const createCarPromise = () => {
      const brandIndex = Math.floor(Math.random() * carBrands.length);
      const modelIndex = Math.floor(Math.random() * carModels.length);
      return performServiceOperation(
        this.carsService.createCar({
          name: `${carBrands[brandIndex]} ${carModels[modelIndex]}`,
          color: generateColor(),
        })
      )
    }

    try {
      const res = await createCarPromise();
      if (!(res instanceof Error)) {
        const carsPromises = Array.from({ length: GENERATED_CARS_NUMBER - 1 }, createCarPromise);
        await Promise.all(carsPromises);
        await this.loadData();
        onComplete(null);
      } else {
        throw res;
      }
    } catch (error) {
      if (error instanceof Error)
        onComplete(error);
    }
  }

  private handleLoadWinners = async (e?: CustomEvent<SortState>) => {
    if (e?.detail) this.sort = e.detail;
    let loadWinnersData = {};
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
      loadWinnersData = { ...result, sort: this.sort, carsData, isRaceInProgress, winnersPageNumber };
    } catch (error) {
      loadWinnersData = { error };
    } finally {
      this.emit(EVENT.LOAD_WINNERS, loadWinnersData);
    }
  }
}
