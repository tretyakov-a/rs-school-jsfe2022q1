import { Component, ComponentProps } from '@core/component';
import { ProductsListView } from '@views/products-list';
import { EVENT } from '@common/constants';
import { ProductsListItem } from './products-list-item';
import { ProductsLoadEventData } from './app';

export enum ProductListDisplayOption {
  LIST = 'list',
  GRID = 'grid',
};

export class ProductsList extends Component {
  private displayOption: ProductListDisplayOption;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsListView,
    });

    this.displayOption = ProductListDisplayOption.GRID;
    this.onLoadingStart();
    
    this.on(EVENT.PRODUCTS_LOAD, this.handleProductsListUpdate);
    this.on(EVENT.PRODUCTS_LIST_UPDATE, this.handleProductsListUpdate);
    this.on(EVENT.CHANGE_DISPLAY_OPTION, this.onChangeDisplayOption);
  }

  private handleProductsListUpdate = (e: CustomEvent<ProductsLoadEventData>) => {
    this.update(e.detail);
  }

  private onChangeDisplayOption = (e: CustomEvent<ProductListDisplayOption>) => {
    const prevOptions = this.displayOption;
    this.displayOption = e.detail;
    const className = ProductsListView.className;
    this.getElement().classList.replace(
      `${className}_${prevOptions}`,
      `${className}_${this.displayOption}`
    );
  }
  
  public update(data: ProductsLoadEventData): void {
    const { displayOption } = this;
    const { products, productInCartIds } = data;
    this.components = products.map((item) => {
      return ['products', ProductsListItem, {
        data: {
          product: item,
          isInCart: productInCartIds.includes(item.id),
        },
      }]
    });

    super.update({ displayOption });
  }

}
