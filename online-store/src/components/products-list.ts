import { Component, ComponentProps } from '@core/component';
import { ProductsListView } from '@views/products-list';
import { EVENT } from '@common/constants';
import { ProductsListItem } from './products-list-item';
import { ProductsLoadEventData } from './app';

export class ProductsList extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsListView,
    });
;
    this.onLoadingStart();
    
    this.on(EVENT.PRODUCTS_LOAD, this.handleProductsListUpdate);
    this.on(EVENT.PRODUCTS_LIST_UPDATE, this.handleProductsListUpdate);
  }

  private handleProductsListUpdate = (e: CustomEvent<ProductsLoadEventData>) => {
    this.update(e.detail);
  }

  public update(data: ProductsLoadEventData): void {
    const { products, productInCartIds } = data;
    this.components = products.map((item) => {
      return ['products', ProductsListItem, {
        data: {
          product: item,
          isInCart: productInCartIds.includes(item.id),
        },
      }]
    });

    super.update();
  }

}
