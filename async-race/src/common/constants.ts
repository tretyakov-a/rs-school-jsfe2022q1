
export const BASE_URL = 'http://localhost:3000';

export enum EVENT {
  LOAD_APP = 'onAppLoad',
  SHOW_ALERT = 'onShowAlert',
  CHANGE_PAGE = 'onChangePage',
  CREATE_CAR = 'onCreateCar',
  UPDATE_CAR = 'onUpdateCar',
  SELECT_CAR = 'onSelectCar',
}

export const MIN_CAR_NAME_LENGTH = 3;
export const CARS_PER_PAGE = 7;
