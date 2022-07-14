import { CART_PRODUCTS_LIMIT, EVENT } from '@common/constants';
import { Component, ComponentProps } from '@core/component';
import { Filter } from './filters/filter';
import { SORT, sortData } from '@common/sorting';
import { isEqualProductsArrays, Product } from '@common/product';
import { ShopPageView } from '@views/shop-page';
import { printComponentsTree, selectFrom } from '@common/utils';
import { DummyProductsService, IProductsService, ProductsService } from '@common/products-service';
import { IStorageService, LocalStorageService } from '@common/storage-service';

export type AppLoadEventData = {
  products: Product[];
  state: AppState;
  error: Error | null;
};

type AppState = {
  productInCartIds: string[];
  sort: SORT;
  filterStates: Record<string, unknown>;
}

export class App extends Component {
  private productsService: IProductsService;
  private storageService: IStorageService<AppState>;
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

    // this.productsService = new DummyProductsService();
    this.productsService = new ProductsService();

    this.storageService = new LocalStorageService<AppState>('appState');
    this.products = [];
    this.filtred = [];
    this.productInCartIds = [];
    this.sort = SORT.TITLE_ASC;
    this.filterStates = {};

    this.on(EVENT.FILTERS_CHANGE, this.handleFiltersChange);
    this.on(EVENT.TRY_ADD_TO_CART, this.handleTryAddToCart);
    this.on(EVENT.CHANGE_SORT, this.handleChangeSort)

    window.addEventListener('beforeunload', this.saveState);

    this.productsService.load()
      .then(this.handleDataLoad)
      .then(this.handleStateLoad)
      .catch((err: Error) => {
        this.emit(EVENT.SHOW_ALERT, `Ошибка при загрузке данных: ${err.message}`);
        this.handleAppLoad(err);
      })

    this.getRoot().insertAdjacentHTML('beforeend', this.render());
    this.afterRender();
  }
  
  private updateProductsList(products: Product[] = this.filtred) {
    const [_, sortingFunction] = sortData[this.sort];
    sortingFunction.call(null, this.filtred);
    this.emit(EVENT.PRODUCTS_LIST_UPDATE, { products, state: this.getState() });
  }

  private handleDataLoad = async (data: Product[]) => {
    this.products = data;

    return this.loadState();
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

  private getState(): AppState {
    const { productInCartIds, sort, filterStates } = this;
    return {
      productInCartIds, sort, filterStates
    }
  }

  private setState(state: AppState): void {
    const { productInCartIds, sort, filterStates } = state;
    this.productInCartIds = productInCartIds;
    this.sort = sort;
    this.filterStates = filterStates;
  }

  private handleAppLoad = async (error: Error | null = null) => {
    const products = error ? [] : this.filtred;
    this.emit(EVENT.APP_LOAD, { products, state: this.getState(), error });
  }

  private handleStateLoad = async (state: AppState | null): Promise<void> => {
    if (state === null) {
      this.saveState();
    } else {
      this.setState(state);
    }

    this.filtred = [...this.products];
    const [_, sortingFunction] = sortData[this.sort];
    sortingFunction.call(null, this.filtred);

    this.handleAppLoad(null);
  }

  private async loadState(): Promise<AppState | null> {
    return await this.storageService.load();
  }

  private saveState = async (): Promise<void> => {
    this.storageService.save(this.getState());
  }
}

