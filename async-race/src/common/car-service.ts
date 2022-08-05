import { CarEntity, CarData, ENGINE_STATUS } from '@common/car';
import { BASE_URL } from './constants';
import { handleHttpErrors } from './http';
import { queryOptionsToString } from './utils';

export type QueryOptions = {
  _page?: number;
  _limit?: number;
  id?: string;
  status?: string;
}

export type CarsData = {
  cars: CarEntity[];
  carsAmount: number;
}

export type DriveResult = {
  success: boolean;
}

export type RaceResults = DriveResult & { id?: string, time?: number };

export interface ICarService {
  getCars(queryOptions: QueryOptions): Promise<CarsData>;
  getCar(id: string): Promise<CarEntity | null>;
  createCar(data: CarData): Promise<void>;
  deleteCar(id: string): Promise<void>;
  updateCar(id: string, data: CarData): Promise<void>;
}

// const WINNERS_URL = `${BASE_URL}/winners`;

export class CarService implements ICarService {
  private static URL = `${BASE_URL}/garage`;

  public async getCars(queryOptions: QueryOptions): Promise<CarsData> {
    const url = `${CarService.URL}?${queryOptionsToString(queryOptions)}`;
    const res = handleHttpErrors(await fetch(url));
    const cars = await res.json();
    const carsAmount = Number(res.headers.get('X-Total-Count'));
    return { cars, carsAmount };
  };

  public async getCar(id: string): Promise<CarEntity| null> {
    const res = handleHttpErrors(await fetch(`${CarService.URL}/${id}`));
    return res.json();
  };

  public async createCar(data: CarData): Promise<void> {
    handleHttpErrors(await fetch(CarService.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }));
  };

  public async deleteCar(id: string): Promise<void> {
    handleHttpErrors(await fetch(`${CarService.URL}/${id}`, {
      method: 'DELETE',
    }));
  };

  public async updateCar(id: string, data: CarData): Promise<void> {
    handleHttpErrors(await fetch(`${CarService.URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }));
  };

}
