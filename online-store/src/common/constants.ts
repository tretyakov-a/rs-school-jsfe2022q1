export const DEFAULT_FILTER_OPTION = 'all';

export const BASE_URL = 'https://raw.githubusercontent.com/tretyakov-a/online-store/main';

export enum EVENT {
  PRODUCTS_LOAD = 'onProductsLoad',
  FILTERS_CHANGE = 'onFiltersChange',
  ADD_TO_CART = 'onAddToCart',
}

export enum FILTER_NAME {
  PRICE = 'price',
  WEIGHT = 'weight',
  BRAND = 'brand',
  COLOR = 'color',
}

export const SPECS = [
  'height',
  'len',
  'material',
  'weight',
  'width',
  'equipment',
  'extra',
  'guarantee',
  'fpv',
  'cameraIncluded',
  'model',
  'color',
  'size',
  'type',
  'engineType',
  'gps',
  'autoLanding',
  'sdditionalFlightFeatures',
  'flightTrajectory',
  'flightDuration',
  'altitudePointHold',
  'batteryCapacity',
  'batteryNumber',
  'batteryVoltage',
  'batteryType',
  'mobileAttach',
  'tabletSupport',
  'compatibleOs',
  'mobileControl',
  'remoteControlDeviceIncluded',
  'controlRadius',
  'headlessMode',
  'remoteControlDeviceScreen',
  'remoteControlDeviceBattery',
  'propellerDiameter',
  'manufacturer',
  'manufacturerCode',
  'cameraResolution',
  'hdVideo',
  'memoryCardSupport',
  'maxHorizontalSpeed',
  'maxViewAngle',
  'videoMode',
  'maxAltitude',
  'suspensionIncluded',
  'maxVerticalSpeed',
  'memoryCardTypeAndCapacity',
];

export const PROPS = [
  'dimensions',
  'additionalInfo',
  'factoryData',
  'camera',
  'classification',
  'flightCharacteristics',
  'power',
  'mobileSupport',
  'remoteControlDevice',
  'photoAndVideo'
];