import { Component, ComponentHandlers } from '@core/component';
import { ProductsListView } from '@views/products-list';
import { ProductsListItemView } from '../views/products-list-item/index';
import json from '../../assets/data-sample.json';
import { BASE_URL, PROPS, SPECS } from '@common/constants';
import { Filter } from './filters/filter';

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

  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new ProductsListView(),
    });
    this.products = [];

    this.onLoadingStart();
    
    // fetch(url)
    //   .then((res): Promise<Product[]> => res.json())
    //   .then((data: Product[]) => {
    //     this.onLoadingEnd();
    //     this.products = data;
    //     this.handlers?.onDataLoad(this.products);
    //     this.update(this.products);
    //   })
    //   .catch((err: Error) => {
    //     this.handlers?.onDataLoad(this.products);
    //     super.update(err.message);
    //   })

    setTimeout(() => {
      this.onLoadingEnd();
      this.products = json;
      this.handlers?.onDataLoad(this.products);
      this.update(this.products);
    }, 500);
  }

  public update(data: Product[]): void {
    super.clear();
    const items: Component[] = [];

    data.forEach((item) => {
      items.push(
        new Component({
          view: new ProductsListItemView({ data: item })
        })
      )
    });

    this.components.items = items;
  }

  public onFiltersChange(filters: Filter[]): void {
    const filtred = this.products.filter((item) => {
      return filters.reduce((acc, filter) => (
        acc && filter.check(item)
      ), true);
    });

    this.update(filtred);
  }
}
