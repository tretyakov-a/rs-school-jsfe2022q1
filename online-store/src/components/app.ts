import { BASE_URL, EVENT, ProductProp, PROPS, SPECS } from '@common/constants';
import { Component, ComponentProps } from '@core/component';
import { FooterView } from '@views/footer';
import { Filter } from './filters/filter';
import { Header } from './header';
import { Main } from './main';
import json from '../../assets/data-sample.json';

const url = `${BASE_URL}/data.json`;

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

export class App extends Component {
  private products: Product[];
  private productInCartIds: string[];
  
  constructor(props: ComponentProps, rootSelector: string) {
    super({
      ...props,
      root: rootSelector
    });

    this.products = [];
    this.productInCartIds = [ '795abdd5e7673332', '279079561d533332' ];

    this.components = [
      ['header', Header],
      ['main', Main ],
      ['footer', Component, {
        viewConstructor: FooterView,
      }]
    ];

    this.on(EVENT.FILTERS_CHANGE, this.handleFiltersChange);
    this.on(EVENT.ADD_TO_CART, this.handleAddToCart);

    // fetch(url)
    //   .then((res): Promise<Product[]> => res.json())
    //   .then((data: Product[]) => {
    //     this.onDataLoad(data);
    //   })
    //   .catch((err: Error) => {
    //     this.handlers?.onDataLoad(this.products);
    //     super.update(err.message);
    //   })

    setTimeout(() => {
      this.handleDataLoad(json);
    }, 500);

    this.update();
  }

  private handleDataLoad = (data: Product[]) => {
    this.products = data;
    const { products, productInCartIds } = this;
    this.emit(EVENT.PRODUCTS_LOAD, { products, productInCartIds });
  }

  private handleFiltersChange = (e: CustomEvent<Filter[]>): void => {
    const { products, productInCartIds } = this;
    const filters = e.detail;
    const filtred = products.filter((item) => {
      return filters.reduce((acc, filter) => (
        acc && filter.check(item)
      ), true);
    });
    this.emit(EVENT.PRODUCTS_LIST_UPDATE, { products: filtred, productInCartIds });
  }

  private handleAddToCart = (e: CustomEvent<string>): void => {
    const productId = e.detail;
    const product = this.products.find((item) => item.id === productId);
    if (product !== undefined && !this.productInCartIds.includes(product.id)) {
      this.productInCartIds.push(product.id);
    }
  }
}

