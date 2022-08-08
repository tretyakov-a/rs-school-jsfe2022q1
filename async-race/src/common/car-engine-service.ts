import { ENGINE_STATUS } from "./car";
import { DriveResult } from "./car-service";
import { BASE_URL } from "./constants";
import { handleHttpErrors, HttpError, HTTP_CODES } from "./http";
import { queryOptionsToString } from "./utils";

export type EngineData = {
  velocity: number;
  distance: number;
}

export interface ICarEngineService {
  switchEngine(id: string, status: ENGINE_STATUS): Promise<EngineData>;
  switchDriveMode(id: string): Promise<DriveResult>;
}

export class CarEngineService implements ICarEngineService {
  private static URL = `${BASE_URL}/engine`;
  
  public async switchEngine(id: string, status: ENGINE_STATUS): Promise<EngineData> {
    const url = `${CarEngineService.URL}?${queryOptionsToString({
      id, status
    })}`;
    const res = handleHttpErrors(await fetch(url, {
      method: 'PATCH'
    }));
    return res.json();
  }

  public async switchDriveMode(id: string): Promise<DriveResult> {
    const url = `${CarEngineService.URL}?${queryOptionsToString({
      id, status: ENGINE_STATUS.DRIVE
    })}`;
    try {
      const res = handleHttpErrors(await fetch(url, {
        method: 'PATCH'
      }));
      return res.json();
    } catch (error) { 
      if (error instanceof HttpError && error.status === HTTP_CODES.SERVER_ERROR ) {
        return { 'success': false }
      }
      throw error;
    }
  }
}