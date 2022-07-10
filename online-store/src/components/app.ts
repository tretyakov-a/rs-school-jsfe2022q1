import { BASE_URL, EVENT } from '@common/constants';
import { Component, ComponentProps } from '@core/component';
import { FooterView } from '@views/footer';
import { Filter } from './filters/filter';
import { Header } from './header';
import { Main } from './main';
import json from '../../assets/data-sample.json';
import { SORT, sortData, SortingFunction } from '@common/sorting';
import { Product } from '@common/product';

const url = `${BASE_URL}/data.json`;

export type ProductsLoadEventData = {
  products: Product[];
  productInCartIds: string[];
};

export class App extends Component {
  private products: Product[];
  private filtred: Product[];
  private productInCartIds: string[];
  private sortingFunction: SortingFunction;
  
  constructor(props: ComponentProps, rootSelector: string) {
    super({
      ...props,
      root: rootSelector
    });

    this.products = [];
    this.filtred = [];
    this.productInCartIds = [];
    // this.productInCartIds = [ '795abdd5e7673332', '279079561d533332' ];

    this.sortingFunction = sortData[SORT.PRICE_ASC][1];

    this.components = [
      ['header', Header],
      ['main', Main ],
      ['footer', Component, {
        viewConstructor: FooterView,
      }]
    ];

    this.on(EVENT.FILTERS_CHANGE, this.handleFiltersChange);
    this.on(EVENT.ADD_TO_CART, this.handleAddToCart);
    this.on(EVENT.CHANGE_SORT, this.handleChangeSort)

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

  private updateProductsList(products: Product[] = this.filtred) {
    const { productInCartIds } = this;
    this.sortingFunction.call(null, this.filtred);
    this.emit(EVENT.PRODUCTS_LIST_UPDATE, { products, productInCartIds });
  }

  private handleDataLoad = (data: Product[]) => {
    this.products = data;
    this.filtred = [...this.products];
    this.sortingFunction.call(null, this.filtred);

    const { productInCartIds } = this;
    this.emit(EVENT.PRODUCTS_LOAD, { products: this.filtred, productInCartIds });
  }

  private handleFiltersChange = (e: CustomEvent<Filter[]>): void => {
    const filters = e.detail;
    this.filtred = this.products.filter((item) => {
      return filters.reduce((acc, filter) => (
        acc && filter.check(item)
      ), true);
    });
    this.updateProductsList();
  }

  private handleAddToCart = (e: CustomEvent<string>): void => {
    const productId = e.detail;
    const product = this.products.find((item) => item.id === productId);
    if (product !== undefined && !this.productInCartIds.includes(product.id)) {
      this.productInCartIds.push(product.id);
    }
  }

  private handleChangeSort = (e: CustomEvent<SORT>) => {
    this.sortingFunction = sortData[e.detail][1];
    this.updateProductsList();
  }
}

