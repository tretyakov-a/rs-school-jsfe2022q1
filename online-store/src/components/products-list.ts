import { Component, ComponentProps } from '@core/component';
import { ProductsListView } from '@views/products-list';
import { EVENT, DISPLAY_OPTION_DEFAULT, DISPLAY_OPTION } from '@common/constants';
import { ProductsLoadEventData } from './app';

export type ProductsListViewOptions = ProductsLoadEventData & {
  displayOption: DISPLAY_OPTION
};

export class ProductsList extends Component {
  private displayOption: DISPLAY_OPTION;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsListView,
    });

    this.displayOption = DISPLAY_OPTION_DEFAULT;
    this.onLoadingStart();
    
    this.on(EVENT.PRODUCTS_LOAD, this.handleProductsListLoad);
    this.on(EVENT.PRODUCTS_LIST_UPDATE, this.handleProductsListUpdate);
    this.on(EVENT.CHANGE_DISPLAY_OPTION, this.onChangeDisplayOption);
  }

  private handleProductsListLoad = (e: CustomEvent<ProductsLoadEventData>) => {
    const { displayOption } = this;
    this.onLoadingEnd({ ...e.detail, displayOption });
  }

  private handleProductsListUpdate = (e: CustomEvent<ProductsLoadEventData>) => {
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
