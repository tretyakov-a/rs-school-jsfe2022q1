
export const BASE_URL = 'http://localhost:3000';

export enum EVENT {
  LOAD_APP = 'onAppLoad',
  SHOW_ALERT = 'onShowAlert',
  CHANGE_PAGE = 'onChangePage',
  TRY_CREATE_CAR = 'onCreateCar',
  TRY_UPDATE_CAR = 'onUpdateCar',
  SELECT_CAR = 'onSelectCar',
  TRY_REMOVE_CAR = 'onTryRemoveCar',
  REMOVE_CAR = 'onRemoveCar',
  ACCELERATE_CAR = 'onAccelerateCar',
  BREAK_CAR = 'onBreakCar',
}

export const MIN_CAR_NAME_LENGTH = 3;
export const CARS_PER_PAGE = 7;
