import { DriveResult, RaceResults } from "./car-service";
import { EngineData, ICarEngineService } from './car-engine-service';
import { CarsListItem } from '@components/garage-page/cars-list-item';
import { performServiceOperation } from "./utils";

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

export class Car {
  private carEngineService: ICarEngineService;
  public status: ENGINE_STATUS;
  public prevTime: number;
  private velocity: number;
  private distance: number;
  private currDistance: number;
  public carListItem: CarsListItem;
  public rejectDrivePromise: ((reason: unknown) => void) | null;

  constructor(carImg: CarsListItem, carEngineService: ICarEngineService) {
    this.carEngineService = carEngineService;
    this.carListItem = carImg;
    this.status = ENGINE_STATUS.STOPPED;
    this.prevTime = 0;
    this.velocity = 0;
    this.distance = 0;
    this.currDistance = 0;
    this.rejectDrivePromise = null;
  }

  get time(): number {
    return this.distance / this.velocity;
  }

  public updateTransform() {
    const brokenTransform = this.status === ENGINE_STATUS.BROKEN
      ? `skewX(10deg)`
      : '';
    const carEl = this.carListItem.carImg?.getRoot();
    if (carEl !== undefined) {
      carEl.style.transform = `translateX(${this.currDistance}px) ${brokenTransform}`;
    }
  }

  private animate = () => {
    const currentTime = Date.now();
    const dt = currentTime - this.prevTime;
    this.currDistance += dt * this.velocity;
    this.updateTransform();
    this.prevTime = Date.now();
    if (this.currDistance <= this.distance && this.status === ENGINE_STATUS.DRIVE) {
      requestAnimationFrame(this.animate);
    }
  }

  public startEngine = (engineData: EngineData): void => {
    const { buttons } = this.carListItem;
    buttons['accelerate'].disable();
    buttons['break'].enable();

    const carEl = this.carListItem.carImg?.getRoot();
    this.status = ENGINE_STATUS.STARTED;
    const trackEl = carEl?.parentElement;
    if (!trackEl) return;
    const { velocity, distance } = engineData;
    const carRect = carEl.getBoundingClientRect();
    const { width } = trackEl.getBoundingClientRect();
    this.distance = width - carRect.width;
    const t = Math.round(distance / velocity);
    this.velocity = this.distance / t;
  }

  public startDrive = (): void => {
    this.status = ENGINE_STATUS.DRIVE;
    this.prevTime = Date.now();
    this.animate();
  }

  public handleEngineBroke = (): void => {
    this.status = ENGINE_STATUS.BROKEN;
  }

  public break = ({ success }: DriveResult): void => {
    this.status = success ? ENGINE_STATUS.STOPPED : ENGINE_STATUS.BROKEN;
  }

  public reset() {
    const { buttons } = this.carListItem;
    buttons['accelerate'].enable();
    buttons['break'].disable();

    const carEl = this.carListItem.carImg?.getRoot();
    this.velocity = 0;
    this.distance = 0;
    this.currDistance = 0;
    this.status = ENGINE_STATUS.STOPPED;
    if (carEl) {
      this.updateTransform();
    }
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

  public tryStartDrive = async (): Promise<RaceResults> => {
    this.startDrive();
    return new Promise((resolve, reject) => {
      this.rejectDrivePromise = reject;
      const { id } = this.carListItem.car;
      const time = this.time || 0;
      this.accelerateCar(id, (err: Error | null, driveResult: DriveResult = { success: false }): void => {
        if (err || !driveResult.success) {
          this.handleEngineBroke();
          return reject(err || 'Car engine broke');
        }
        this.break(driveResult);
        resolve({...driveResult, id, time });
      });
    });
  }
}
