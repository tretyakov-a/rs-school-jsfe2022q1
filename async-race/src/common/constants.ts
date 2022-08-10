
export const BASE_URL = 'http://localhost:3000';
export const MAX_ONE_TIME_REQUESTS = 6;
export const DEFAULT_FORM_DATA = { name: '', color: '#000000'};

export enum EVENT {
  LOAD_APP = 'onAppLoad',
  SHOW_ALERT = 'onShowAlert',
  ROUTER_CHANGE_PAGE = 'onChangePage',
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
  RACE_END = 'onRaceEnd',
  GARAGE_CHANGE_PAGE = 'onGarageChangePage',
  WINNERS_CHANGE_PAGE = 'onWinnersChangePage',
  GENERATE_CARS = 'onGenerateCars',
  LOAD_WINNERS = 'onLoadWinners',
  GET_WINNERS = 'onGetWinners',
  UPDATE_CAR_FORM_DATA = 'onUpdateCarFrom',
  GET_APP_STATE = 'onGetAppState',
}

export const MIN_CAR_NAME_LENGTH = 3;

export enum ITEMS_PER_PAGE {
  GARAGE = 7,
  WINNERS = 10,
}

export const GENERATED_CARS_NUMBER = 100;
export const carBrands = [
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Land Rover',
  'Lexus',
  'Mercedes-Benz',
  'Nissan',
  'Opel',
  'Porsche',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
];

export const carModels = [
  'Model S',
  'Model 3',
  'Model X',
  'Model Y',
  'X1',
  'X2',
  'X3',
  'X4',
  'W222',
  'C217',
]