
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

type PropKey = typeof PROPS[number];
type SpecKey = typeof SPECS[number];
type ProductPropSpec = Partial<Record<SpecKey, {
  title: string;
  value: string;
}>>;

export type ProductProp = Partial<Record<PropKey, {
  title: string;
  specs: ProductPropSpec;
}>>;

export interface Product {
  id: string;
  imgs: string[]
  title: string;
  price: number;
  rating: string;
  brand: string;
  brandImage: string;
  description: string;
  props: ProductProp;
};

export type PropPicker = (product: Product) => string | number | undefined;

export enum PROP {
  PRICE = 'price',
  RATING = 'rating',
  BRAND = 'brand',
  COLOR = 'color',
  WEIGHT = 'weight',
}

export const propPickers: Record<string, PropPicker> = {
  [PROP.PRICE]: (item: Product): number => item.price,
  [PROP.RATING]: (item: Product): number => Number(item.rating),
  [PROP.BRAND]: (item) => item.brand,
  [PROP.COLOR]: (item) => item.props.classification?.specs.color?.value,
  [PROP.WEIGHT]: (item) => Number.parseInt(item.props.dimensions?.specs.weight?.value || ''),
}