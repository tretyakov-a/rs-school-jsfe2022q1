import { CART_PRODUCTS_LIMIT, EVENT } from '@common/constants';
import { Component, ComponentProps } from '@core/component';
import { Filter } from './filters/filter';
import { SORT, sortData } from '@common/sorting';
import { isEqualProductsArrays, Product } from '@common/product';
import { ShopPageView } from '@views/shop-page';
import { printComponentsTree, selectFrom } from '@common/utils';
import { DummyProductsService, IProductsService } from '../common/products-service';

export type ProductsLoadEventData = {
  products: Product[];
  productInCartIds: string[];
  error: Error | null;
};

type AppState = {
  productInCartIds: string[];
  sort: SORT;
  filterStates: Record<string, unknown>;
}

export class App extends Component {
  private productsService: IProductsService;
  private products: Product[];
  private filtred: Product[];
  private productInCartIds: string[];
  private sort: SORT;
  private filterStates: Record<string, unknown>;
  
  constructor(props: ComponentProps, rootSelector: string) {
    super({
      ...props,
      viewConstructor: ShopPageView,
      viewOptions: {
        root: selectFrom(document)(rootSelector),
      }
    });

    this.productsService = new DummyProductsService();
    this.products = [];
    this.filtred = [];
    this.productInCartIds = [];
    // this.productInCartIds = [ '795abdd5e7673332', '279079561d533332' ];
    this.sort = SORT.TITLE_ASC;
    this.filterStates = {};

    this.on(EVENT.FILTERS_CHANGE, this.handleFiltersChange);
    this.on(EVENT.TRY_ADD_TO_CART, this.handleTryAddToCart);
    this.on(EVENT.CHANGE_SORT, this.handleChangeSort);
    
    this.productsService.load()
      .then((data) => this.handleDataLoad(data))
      .catch((err: Error) => {
        this.emit(EVENT.SHOW_ALERT, `Ошибка при загрузке данных: ${err.message}`);
        this.handleDataLoad([], err);
      })

    this.getRoot().insertAdjacentHTML('beforeend', this.render());
    this.afterRender();
  }
  
  private updateProductsList(products: Product[] = this.filtred) {
    const { productInCartIds } = this;
    const [_, sortingFunction] = sortData[this.sort];
    sortingFunction.call(null, this.filtred);
    this.emit(EVENT.PRODUCTS_LIST_UPDATE, { products, productInCartIds });
  }

  private handleDataLoad = (data: Product[], error: Error | null = null) => {
    this.products = data;
    this.filtred = [...this.products];
    const [_, sortingFunction] = sortData[this.sort];
    sortingFunction.call(null, this.filtred);

    const { productInCartIds } = this;
    this.emit(EVENT.PRODUCTS_LOAD, { products: this.filtred, productInCartIds, error });
  }

  private handleFiltersChange = (e: CustomEvent<Filter[]>): void => {
    const filters = e.detail;
    
    this.filterStates = filters.reduce((acc: Record<string, unknown>, filter) => {
      acc[filter.getName()] = filter.getState();
      return acc;
    }, {});

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
        this.emit(EVENT.SHOW_ALERT, `Корзина переполнена! Лимит товаров в корзине: ${CART_PRODUCTS_LIMIT}.`);
      } else {
        this.productInCartIds.push(product.id);
        this.emit(EVENT.ADD_TO_CART, product.id);
      }
    }
  }

  private handleChangeSort = (e: CustomEvent<SORT>) => {
    if (this.sort === e.detail) return;
    this.sort = e.detail;
    this.updateProductsList();
  }
}

