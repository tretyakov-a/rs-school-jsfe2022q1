import { Car, CarData } from '@common/car';
import { BASE_URL } from './constants';

export type QueryOptions = {
  _page?: number,
  _limit?: number,
}

export type CarsData = {
  cars: Car[];
  carsAmount: number;
}

export interface ICarService {
  getCars(queryOptions: QueryOptions): Promise<CarsData>;
  getCar(id: string): Promise<Car | null>;
  createCar(data: CarData): Promise<void>;
  deleteCar(id: string): Promise<void>;
  updateCar(id: string, data: CarData): Promise<void>;
}

const GARAGE_URL = `${BASE_URL}/garage`;
const ENGINE_URL = `${BASE_URL}/engine`;
const WINNERS_URL = `${BASE_URL}/winners`;

function handleHttpErrors(res: Response): Response {
  if (!res.ok) {
    throw new Error(`Http error: ${res.statusText}`);
  }
  return res;
}

function queryOptionsToString(queryOptions: QueryOptions): string {
  return Object.entries(queryOptions)
    .map((opt) => opt.join('='))
    .join('&');
}

export class CarService implements ICarService {

  public async getCars(queryOptions: QueryOptions): Promise<CarsData> {
    const url = `${GARAGE_URL}?${queryOptionsToString(queryOptions)}`;
    const res = handleHttpErrors(await fetch(url));
    const cars = await res.json();
    const carsAmount = Number(res.headers.get('X-Total-Count'));
    return { cars, carsAmount };
  };

  public async getCar(id: string): Promise<Car | null> {
    const res = handleHttpErrors(await fetch(`${GARAGE_URL}/${id}`));
    return res.json();
  };

  public async createCar(data: CarData): Promise<void> {
    handleHttpErrors(await fetch(GARAGE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }));
  };

  public async deleteCar(id: string): Promise<void> {
    handleHttpErrors(await fetch(`${GARAGE_URL}/${id}`, {
      method: 'DELETE',
    }));
  };

  public async updateCar(id: string, data: CarData): Promise<void> {
    handleHttpErrors(await fetch(GARAGE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }));
  }; 
}
