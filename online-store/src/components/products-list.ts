import { Component, ComponentHandlers } from '@core/component';
import { ProductsListView } from '@views/products-list';
import { ProductsListItemView } from '../views/products-list-item/index';
import json from '../../assets/data-sample.json';
import { BASE_URL, PROPS, SPECS } from '@common/constants';

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

class ProductsList extends Component {
  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new ProductsListView(),
    });

    this.onLoadingStart();
    setTimeout(() => {
      this.onLoadingEnd();
      this.update(json as Product[])
    }, 500);
  }

  public update(data: Product[]): void {
    super.update('');
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
}

export default ProductsList;
