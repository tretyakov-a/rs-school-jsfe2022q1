import { CART_PRODUCTS_LIMIT, EVENT, DISPLAY_OPTION } from '@common/constants';
import { ComponentProps } from '@core/component';
import { Filter } from './filters/filter';
import { SORT, sortData } from '@common/sorting';
import { isEqualProductsArrays, Product } from '@common/product';
import { ShopPageView } from '@views/shop-page';
import { printComponentsTree, selectFrom } from '@common/utils';
import { DummyProductsService, IProductsService, ProductsService } from '@common/products-service';
import { AppState, AppStateProcessor } from './app-state';

export type AppLoadEventData = {
  products: Product[];
  state: AppState;
  error: Error | null;
};

export class App extends AppStateProcessor {
  private productsService: IProductsService;
  private products: Product[];
  private filtred: Product[];

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

    this.on(EVENT.CHANGE_FILTERS, this.handleFiltersChange);
    this.on(EVENT.TRY_ADD_TO_CART, this.handleTryAddToCart);
    this.on(EVENT.CHANGE_SORT, this.handleChangeSort);
    this.on(EVENT.RESET_SETTINGS, this.handleResetSettings);
    this.on(EVENT.CHANGE_DISPLAY_OPTION, this.handleChangeDisplayOption);
    this.on(EVENT.CHANGE_FILTER_APPEARANCE, this.handleFilterAppearanceChange);

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
  
  private get sort() {
    const [_, sortingFunction] = sortData[this.state.sort];
    return sortingFunction;
  }

  private updateProductsList(products: Product[] = this.filtred) {
    this.emit(EVENT.UPDATE_PRODUCTS_LIST, { products, state: this.state });
  }

  private handleDataLoad = async (data: Product[]) => {
    this.products = data;

    return this.loadState();
  }

  private handleFiltersChange = (e: CustomEvent<Filter[]>): void => {
    const filters = e.detail;
    
    this.state.filterStates = filters.reduce((acc: Record<string, unknown>, filter) => {
      acc[filter.getName()] = filter.getState();
      return acc;
    }, {});

    const filtred = this.products.filter((item) => {
      return filters.reduce((acc, filter) => (
        acc && filter.check(item)
      ), true);
    });
    this.sort.call(null, filtred);

    if (!isEqualProductsArrays(this.filtred, filtred)) {
      this.filtred = filtred;
      this.updateProductsList();
    }
  }

  private handleChangeDisplayOption = (e: CustomEvent<DISPLAY_OPTION>) => {
    this.state.appearance.displayOption = e.detail;
  }

  private handleTryAddToCart = (e: CustomEvent<string>): void => {
    const { productInCartIds }= this.state;
    const productId = e.detail;
    const product = this.products.find((item) => item.id === productId);
    if (product !== undefined && !productInCartIds.includes(product.id)) {
      if (productInCartIds.length === CART_PRODUCTS_LIMIT) {
        this.emit(EVENT.SHOW_ALERT, `Извините, все слоты в корзине (${CART_PRODUCTS_LIMIT}) заполнены!`);
      } else {
        productInCartIds.push(product.id);
        this.emit(EVENT.ADD_TO_CART, product.id);
      }
    }
  }

  private handleChangeSort = (e: CustomEvent<SORT>) => {
    if (this.state.sort === e.detail) return;
    this.state.sort = e.detail;
    this.sort.call(null, this.filtred);
    this.updateProductsList();
  }

  private handleAppLoad = async (error: Error | null = null) => {
    const products = error ? [] : this.filtred;
    this.emit(EVENT.LOAD_APP, { products, state: this.state, error });
  }

  private handleStateLoad = async (state: AppState | null): Promise<void> => {
    if (state === null) {
      this.saveState();
    } else {
      this.state = state;
    }

    this.filtred = [...this.products];
    this.sort.call(null, this.filtred);

    this.handleAppLoad(null);
  }

  private handleResetSettings = async (): Promise<void> => {
    this.state = this.getDefaultState();
    this.handleStateLoad(null);
  }

  private handleFilterAppearanceChange = (
    e: CustomEvent<{ filterName: string, isExpanded: boolean }>
  ) => {
    const { filterName, isExpanded } = e.detail;
    this.state.appearance.filters[filterName] = { isExpanded };
  }
}

