import { ComponentProps } from '@core/component';
import { ProductsListView } from '@views/products-list';
import { EVENT, DISPLAY_OPTION_DEFAULT, DISPLAY_OPTION } from '@common/constants';
import { AppLoadEventData } from '../app';
import { AnimatedProductsList } from './animated-products-list';

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
    
    this.on(EVENT.APP_LOAD, this.handleAppLoad);
    this.on(EVENT.PRODUCTS_LIST_UPDATE, this.handleProductsListUpdate);
    this.on(EVENT.CHANGE_DISPLAY_OPTION, this.onChangeDisplayOption);
  }

  get displayOption() {
    return this._displayOption;
  }

  set displayOption(newValue: DISPLAY_OPTION) {
    this.animate = newValue === DISPLAY_OPTION.GRID;
    this._displayOption = newValue;
  }

  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    const { displayOption } = this;
    this.onLoadingEnd({ ...e.detail, displayOption });
  }

  private handleProductsListUpdate = (e: CustomEvent<AppLoadEventData>) => {
    const { displayOption } = this;
    this.update({ ...e.detail, displayOption });
  }

  private onChangeDisplayOption = (e: CustomEvent<DISPLAY_OPTION>) => {
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
}
