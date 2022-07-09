import { Component, ComponentProps } from '@core/component';
import { ProductsListView } from '@views/products-list';
import { ProductsListItemView } from '../views/products-list-item/index';
import json from '../../assets/data-sample.json';
import { BASE_URL, EVENT, PROPS, SPECS } from '@common/constants';
import { Filter } from './filters/filter';
import { useCustom } from '@common/utils';

const url = `${BASE_URL}/data.json`;

type PropKey = typeof PROPS[number];
type SpecKey = typeof SPECS[number];
type ProductPropSpec = Partial<Record<SpecKey, {
  title: string;
  value: string;
}>>;

type ProductProp = Partial<Record<PropKey, {
  title: string;
  specs: ProductPropSpec;
}>>;

export interface Product {
  id: string;
  title: string;
  price: number;
  rating: string;
  brand: string;
  brandImage: string;
  description: string;
  props: ProductProp
};

export class ProductsList extends Component {
  private products: Product[];

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsListView,
    });
    this.products = [];
    this.onLoadingStart();
    
    // fetch(url)
    //   .then((res): Promise<Product[]> => res.json())
    //   .then((data: Product[]) => {
    //     this.onDataLoad(data);
    //   })
    //   .catch((err: Error) => {
    //     this.handlers?.onDataLoad(this.products);
    //     super.update(err.message);
    //   })

    this.on(EVENT.FILTERS_CHANGE, this.handleFiltersChange);

    setTimeout(() => {
      this.handleDataLoad(json);
    }, 500);
  }

  private handleDataLoad = (data: Product[]) => {
    this.products = data;
    this.emit(EVENT.PRODUCTS_LOAD, this.products);
    this.onLoadingEnd(this.products);
  }

  public update(data: Product[]): void {
    this.components = data.map((item) => {
      return ['products', Component, {
        viewConstructor: ProductsListItemView,
        data: item,
      }]
    });

    super.update();
  }

  public handleFiltersChange = (e: CustomEvent<Filter[]>): void => {
    const filters = e.detail;
    const filtred = this.products.filter((item) => {
      return filters.reduce((acc, filter) => (
        acc && filter.check(item)
      ), true);
    });

    this.update(filtred);
  }
}
