
export const BASE_URL = 'http://localhost:3000';

export enum EVENT {
  LOAD_APP = 'onAppLoad',
  SHOW_ALERT = 'onShowAlert',
  CHANGE_PAGE = 'onChangePage',
  CARS_AFTER_RENDER = 'onRenderCars',
  TRY_CREATE_CAR = 'onCreateCar',
  TRY_UPDATE_CAR = 'onUpdateCar',
  SELECT_CAR = 'onSelectCar',
  TRY_REMOVE_CAR = 'onTryRemoveCar',
  REMOVE_CAR = 'onRemoveCar',
  START_CAR_ENGINE = 'onStartCarEngine',
  ACCELERATE_CAR = 'onAccelerateCar',
  BREAK_CAR = 'onBreakCar',
  START_RACE = 'onStartRace',
  RESET_CARS = 'onResetCars',
  WINNER_FINISH = 'onWinnerFinish',
  RACE_END = 'onRaceEnd',
}

export const MIN_CAR_NAME_LENGTH = 3;
export const CARS_PER_PAGE = 7;
