
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
  rating: number;
  year: number;
  brand: string;
  brandImage: string;
  description: string;
  props: ProductProp;
};

export type PropPicker = (product: Product) => string | number | undefined;

export enum PROP {
  PRICE = 'price',
  RATING = 'rating',
  YEAR = 'year',
  BRAND = 'brand',
  COLOR = 'color',
  WEIGHT = 'weight',
  MOBILE_CONTROL = 'mobileControl',
  CAMERA_INCLUDED = 'cameraIncluded',
  TITLE = 'title',
}

export const propPickers: Record<string, PropPicker> = {
  [PROP.PRICE]: (item: Product): number => item.price,
  [PROP.RATING]: (item: Product): number => item.rating,
  [PROP.YEAR]: (item: Product): number => item.year,
  [PROP.BRAND]: (item) => item.brand,
  [PROP.COLOR]: (item) => item.props.classification?.specs.color?.value,
  [PROP.WEIGHT]: (item): number => Number.parseInt(item.props.dimensions?.specs.weight?.value || ''),
  [PROP.MOBILE_CONTROL]: (item) => item.props.mobileSupport?.specs.mobileControl?.value,
  [PROP.CAMERA_INCLUDED]: (item) => item.props.camera?.specs.cameraIncluded?.value,
  [PROP.TITLE]: (item: Product): string => item.title,
}

export function isEqualProductsArrays(a: Product[], b: Product[]) {
  return a.length === b.length && a.every((aItem, i) => {
    return b[i].id === aItem.id
  });
}
