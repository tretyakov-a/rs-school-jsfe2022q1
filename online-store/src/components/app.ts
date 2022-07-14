import { BASE_URL, CART_PRODUCTS_LIMIT, EVENT } from '@common/constants';
import { Component, ComponentProps } from '@core/component';
import { Filter } from './filters/filter';
import json from '@assets/data-sample.json';
import { SORT, sortData, SortingFunction } from '@common/sorting';
import { isEqualProductsArrays, Product } from '@common/product';
import { ShopPageView } from '@views/shop-page';
import { printComponentsTree, selectFrom } from '@common/utils';

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
      viewConstructor: ShopPageView,
      viewOptions: {
        root: selectFrom(document)(rootSelector),
      }
    });

    this.products = [];
    this.filtred = [];
    // this.productInCartIds = [];
    this.productInCartIds = [ '795abdd5e7673332', '279079561d533332' ];

    this.sortingFunction = sortData[SORT.TITLE_ASC][1];

    this.on(EVENT.FILTERS_CHANGE, this.handleFiltersChange);
    this.on(EVENT.TRY_ADD_TO_CART, this.handleTryAddToCart);
    this.on(EVENT.CHANGE_SORT, this.handleChangeSort)

    // fetch(url)
    //   .then((res): Promise<Product[]> => res.json())
    //   .then((data: Product[]) => {
    //     this.handleDataLoad(data);
    //   })
    //   .catch((err: Error) => {
    //     this.handlers?.onDataLoad(this.products);
    //     super.render(err.message);
    //   })

    setTimeout(() => {
      this.handleDataLoad(json);
      // printComponentsTree.call(this);
    }, 500);

    this.getRoot().insertAdjacentHTML('beforeend', this.render());
    this.afterRender();
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
    const filtred = this.products.filter((item) => {
      return filters.reduce((acc, filter) => (
        acc && filter.check(item)
      ), true);
    });
    if (!isEqualProductsArrays(this.filtred, filtred)) {
      this.filtred = filtred;
      this.updateProductsList();
    }
  }

  private handleTryAddToCart = (e: CustomEvent<string>): void => {
    const productId = e.detail;
    const product = this.products.find((item) => item.id === productId);
    if (product !== undefined && !this.productInCartIds.includes(product.id)) {
      if (this.productInCartIds.length === CART_PRODUCTS_LIMIT) {
        this.emit(EVENT.SHOW_ALERT, `Cart is overflown! Its limited to ${CART_PRODUCTS_LIMIT} products`);
      } else {
        this.productInCartIds.push(product.id);
        this.emit(EVENT.ADD_TO_CART, product.id);
      }
    }
  }

  private handleChangeSort = (e: CustomEvent<SORT>) => {
    this.sortingFunction = sortData[e.detail][1];
    this.updateProductsList();
  }
}

