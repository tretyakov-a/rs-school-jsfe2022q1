import { QueryOptions } from "./car-service";
import { BASE_URL } from "./constants";
import { handleHttpErrors } from "./http";
import { queryOptionsToString } from "./utils";

export type Winner = {
  id: string;
  wins: number;
  time: number;
}

export type WinnerData = Omit<Winner, 'id'>;

export type WinnersResponseData = {
  winners: Winner[];
  winnersAmount: number;
}

export interface ICarWinnersService {
  getWinners(queryOptions: QueryOptions): Promise<WinnersResponseData>;
  getWinner(id: string): Promise<Winner | null>;
  createWinner(data: Winner): Promise<void>;
  deleteWinner(id: string): Promise<void>;
  updateWinner(id: string, data: WinnerData): Promise<void>;
}

export class CarWinnersService implements ICarWinnersService {
  private static URL = `${BASE_URL}/winners`;
  
  public async getWinners(queryOptions: QueryOptions): Promise<WinnersResponseData> {
    const url = `${CarWinnersService.URL}?${queryOptionsToString(queryOptions)}`;
    const res = handleHttpErrors(await fetch(url));
    const winners: Winner[] = await res.json();
    const winnersAmount = Number(res.headers.get('X-Total-Count'));
    return { winners, winnersAmount };
  };

  public async getWinner(id: string): Promise<Winner | null> {
    const res = handleHttpErrors(await fetch(`${CarWinnersService.URL}/${id}`));
    return res.json();
  };

  public async createWinner(data: Winner): Promise<void> {
    handleHttpErrors(await fetch(CarWinnersService.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }));
  };

  public async deleteWinner(id: string): Promise<void> {
    handleHttpErrors(await fetch(`${CarWinnersService.URL}/${id}`, {
      method: 'DELETE',
    }));
  };

  public async updateWinner(id: string, data: WinnerData): Promise<void> {
    handleHttpErrors(await fetch(`${CarWinnersService.URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }));
  };
}