import { ComponentProps } from '@core/component';
import { ProductsListView } from '@views/products/products-list';
import { EVENT, DISPLAY_OPTION_DEFAULT, DISPLAY_OPTION } from '@common/constants';
import { AppLoadEventData } from '../app';
import { AnimatedProductsList } from './animated-products-list';
import { ActiveRoute } from '@common/active-route';

export type ProductsListViewOptions = AppLoadEventData & {
  displayOption: DISPLAY_OPTION
};

export class ProductsList extends AnimatedProductsList {
  private _displayOption: DISPLAY_OPTION;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsListView,
    });

    this._displayOption = DISPLAY_OPTION_DEFAULT;

    this.onLoadingStart();
    
    this.on(EVENT.LOAD_APP, this.handleAppLoad);
    this.on(EVENT.UPDATE_PRODUCTS_LIST, this.handleProductsListUpdate);
    this.on(EVENT.CHANGE_DISPLAY_OPTION, this.handleChangeDisplayOption);
  }

  get displayOption() {
    return this._displayOption;
  }

  set displayOption(newValue: DISPLAY_OPTION) {
    this.animate = newValue === DISPLAY_OPTION.GRID;
    this._displayOption = newValue;
  }

  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    const { displayOption } = e.detail.state.appearance;
    this.displayOption = displayOption;
    this.onLoadingEnd({ ...e.detail, displayOption });
  }

  private handleProductsListUpdate = (e: CustomEvent<AppLoadEventData>) => {
    const { displayOption } = this;
    this.update({ ...e.detail, displayOption });
  }

  private handleChangeDisplayOption = (e: CustomEvent<DISPLAY_OPTION>) => {
    const prevOptions = this.displayOption;
    this.displayOption = e.detail;
    const className = ProductsListView.className;
    const listEl = this.getRoot().querySelector(`.${className}`);
    if (listEl !== null) {
      listEl.classList.replace(
        `${className}_${prevOptions}`,
        `${className}_${this.displayOption}`
      );
    }
  }

  protected afterRender(): void {
    super.afterRender();

    this.getRoot().addEventListener('click', this.handleClick);
  }

  private handleClick = (e: Event) => {
    const target = e.target;
    if (target === null || !(target instanceof HTMLElement)) return;
    
    const cartBtn = target.closest('.product__add-to-curt');
    if (cartBtn !== null) return;

    const el = target.closest('.product');

    if (el === null || !(el instanceof HTMLElement)) return;
    const productId = el.getAttribute('data-product-id');

    if (productId === null) return;
    ActiveRoute.change(`product?id=${productId}`);
  }
}
