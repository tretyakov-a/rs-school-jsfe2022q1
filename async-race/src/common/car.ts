import { DriveResult, RaceResults } from "./car-service";
import { EngineData, ICarEngineService } from './car-engine-service';
import { CarsListItem } from '@components/garage-page/cars-list-item';
import { performServiceOperation } from "./utils";
import { MAX_ONE_TIME_REQUESTS } from "./constants";

export type CarEntity = {
  name: string;
  color: string;
  id: string;
}

export enum ENGINE_STATUS {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
  BROKEN = 'broken',
}

export type CarData = Omit<CarEntity, 'id'>;

export type FinishHandler = (id: string, time: number, onWin: (isWinner: boolean) => void) => void;

export class Car {
  private carEngineService: ICarEngineService;
  public status: ENGINE_STATUS;
  public prevTime: number;
  private velocity: number;
  private distance: number;
  private currDistance: number;
  public _carListItem: CarsListItem;
  public rejectDrivePromise: ((reason: unknown) => void) | null;
  public isOnRace: boolean;
  public isWinner: boolean;
  public time: number;
  public serverDriveTime: number;
  public driveTime: number;
  public delay: number;
  private onFinish: FinishHandler;
  public isHandBreak: boolean;

  constructor(
    carListItem: CarsListItem, 
    carEngineService: ICarEngineService, 
    onFinish: FinishHandler) {

    this.carEngineService = carEngineService;
    this._carListItem = carListItem;
    this.status = ENGINE_STATUS.STOPPED;
    this.prevTime = 0;
    this.velocity = 0;
    this.distance = 0;
    this.currDistance = 0;
    this.rejectDrivePromise = null;
    this.isOnRace = false;
    this.isWinner = false;
    this.time = 0;
    this.serverDriveTime = 0;
    this.driveTime = 0;
    this.delay = 0;
    this.onFinish = onFinish;
    this.isHandBreak = false;
  }

  get carListItem() {
    return this._carListItem;
  }

  set carListItem(newItem) {
    this._carListItem = newItem;
    this.updateCarListItem();
  }

  public updateCarListItem() {
    if (this.isOnRace) {
      this.carListItem.buttons['break'].enable();
      this.carListItem.buttons['accelerate'].disable();
    }
    if (this.driveTime >= this.serverDriveTime
      && this.status === ENGINE_STATUS.STOPPED
      && this.time !== 0) {
      if (this.isWinner) {
        this.carListItem.handleWin(this.time);
      } else {
        this.carListItem.handleFinish(this.time);
      }
    }
    this.updateTransform();
  }
  
  public updateTransform() {
    const carEl = this.carListItem.carImg?.getRoot();
    if (carEl !== undefined) {
      if (this.status === ENGINE_STATUS.BROKEN) {
        carEl.classList.add('car-img_broken');
      }
      carEl.style.transform = `translateX(${this.currDistance}px)`;
    }
  }

  private animate = () => {
    const currentTime = Date.now();
    const dt = currentTime - this.prevTime;
    this.driveTime += dt;
    this.currDistance += dt * this.velocity;
    if (this.currDistance > this.distance) {
      this.currDistance = this.distance;
    }
    this.updateTransform();
    this.prevTime = Date.now();
    if ((this.serverDriveTime === 0 || this.driveTime < this.serverDriveTime) && !this.isHandBreak) {
      requestAnimationFrame(this.animate);
    } else {
      this.handleAnimationEnd();
    }
  }

  private handleAnimationEnd() {
    if (this.isHandBreak) return this.reset();
    if (this.status === ENGINE_STATUS.DRIVE) {
      this.status = this.driveTime < this.distance / this.velocity
        ? ENGINE_STATUS.BROKEN
        : ENGINE_STATUS.STOPPED;
    }
    if (this.driveTime >= this.serverDriveTime && this.status === ENGINE_STATUS.STOPPED) {
      const { id } = this.carListItem.car;
      this.onFinish(id, this.time, (isWinner) => {
        this.isWinner = isWinner;
        if (this.isWinner) {
          this.carListItem.handleWin(this.time);
        } else {
          this.carListItem.handleFinish(this.time);
        }
      })
    } else {
      this.updateTransform();
    }
  }

  public startEngine = (engineData: EngineData): void => {
    const { buttons } = this.carListItem;
    buttons['accelerate'].disable();

    const carEl = this.carListItem.carImg?.getRoot();
    this.status = ENGINE_STATUS.STARTED;
    const trackEl = carEl?.parentElement;
    if (!trackEl) return;
    const { velocity, distance } = engineData;
    this.time = Number.parseFloat(((distance / velocity) / 1000).toFixed(3));
    const carRect = carEl.getBoundingClientRect();
    const { width } = trackEl.getBoundingClientRect();
    this.distance = width - carRect.width;
    const t = Math.round(distance / velocity);
    this.velocity = this.distance / t;
  }

  public startDrive = (delay: number = 0): void => {
    const { buttons } = this.carListItem;
    buttons['break'].enable();
    this.delay = delay;
    this.isOnRace = true;
    this.status = ENGINE_STATUS.DRIVE;
    this.prevTime = Date.now();
    this.animate();
  }

  public handleEngineBroke = (): void => {
    this.status = ENGINE_STATUS.BROKEN;
  }

  public break = (): void => {
    this.status = ENGINE_STATUS.STOPPED;
  }

  public reset() {
    this.driveTime = 0;
    this.serverDriveTime = 0;
    this.delay = 0;
    this.carListItem.reset();
    this.velocity = 0;
    this.distance = 0;
    this.currDistance = 0;
    this.status = ENGINE_STATUS.STOPPED;
    this.isOnRace = false;
    this.isWinner = false;
    this.isHandBreak = false;
    this.time = 0;
    this.updateTransform();
  }

  private startCarEngine = async (id: string, onStart: (error: Error | null, engineData?: EngineData) => void) => {
    const result = await performServiceOperation<EngineData>(
      this.carEngineService.switchEngine(id, ENGINE_STATUS.STARTED)
    )
    if (result instanceof Error) {
      onStart(result);
    } else {
      onStart(null, result);
    }
  }

  public tryStartEngine = async (): Promise<EngineData> => {
    this.reset();
    return new Promise((resolve, reject) => {
      const { id } = this.carListItem.car;
      this.startCarEngine(id, (err, engineData?) => {
        if (err || !engineData) return reject(err);
        this.startEngine(engineData);
        resolve(engineData);
      })
    })
  }

  private accelerateCar = async (id: string, onBreak: (err: Error | null, driveResult?: DriveResult) => void ) => {
    const result = await performServiceOperation(
      this.carEngineService.switchDriveMode(id)
    )
    if (result instanceof Error) {
      onBreak(result);
    } else {
      onBreak(null, result);
    }
  }

  public tryStartDrive = async (index: number = -1): Promise<RaceResults> => {
    return new Promise((resolve, reject) => {
      this.rejectDrivePromise = reject;
      const { id } = this.carListItem.car;
      const startTime = Date.now();
      const time = this.time || 0;
      this.accelerateCar(id, (err: Error | null, driveResult: DriveResult = { success: false }): void => {
        this.serverDriveTime = Date.now() - startTime;
        if (index >= MAX_ONE_TIME_REQUESTS) {
          this.serverDriveTime -= this.delay;
        }
        if (err || !driveResult.success) {
          this.handleEngineBroke();
          return reject(err || 'Car engine broke');
        }
        this.break();
        resolve({...driveResult, id, time });
      });
    });
  }

  public handleWin() {
    this.isWinner = true;
  }
}
