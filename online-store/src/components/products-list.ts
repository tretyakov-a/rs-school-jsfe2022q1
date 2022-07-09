import { Component, ComponentProps } from '@core/component';
import { ProductsListView } from '@views/products-list';
import json from '../../assets/data-sample.json';
import { BASE_URL, EVENT, PROPS, SPECS } from '@common/constants';
import { Filter } from './filters/filter';
import { ProductsListItem } from './products-list-item';

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
  props: ProductProp;
};

export type ProductsLoadEventData = {
  products: Product[];
  productInCartIds: string[];
};

export class ProductsList extends Component {
  private products: Product[];
  private productInCartIds: string[];

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsListView,
    });

    this.products = [];
    this.productInCartIds = [ '795abdd5e7673332', '279079561d533332' ];
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
    const { products, productInCartIds } = this;
    this.emit(EVENT.PRODUCTS_LOAD, { products, productInCartIds });
    this.onLoadingEnd(products);
  }

  public update(data: Product[]): void {
    this.components = data.map((item) => {
      return ['products', ProductsListItem, {
        data: {
          product: item,
          isInCart: this.productInCartIds.includes(item.id),
        },
        handlers: {
          onClick: this.handleAddToCart
        }
      }]
    });

    super.update();
  }

  private handleAddToCart = (productId: string = ''): void => {
    const product = this.products.find((item) => item.id === productId);
    if (product !== undefined && !this.productInCartIds.includes(product.id)) {
      this.emit(EVENT.ADD_TO_CART, product);
      this.productInCartIds.push(product.id);
    }
  }

  private handleFiltersChange = (e: CustomEvent<Filter[]>): void => {
    const filters = e.detail;
    const filtred = this.products.filter((item) => {
      return filters.reduce((acc, filter) => (
        acc && filter.check(item)
      ), true);
    });

    this.update(filtred);
  }
}
