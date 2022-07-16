import { EVENT } from "@common/constants";
import { AppLoadEventData } from "@components/app";
import { Component, ComponentProps } from "@core/component";
import { ListedProductsAmountView } from "@views/listed-products-amount";

export class ListedProductsAmount extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ListedProductsAmountView,
    });

    this.on(EVENT.UPDATE_PRODUCTS_LIST, this.handleProductsListUpdate);
    this.on(EVENT.LOAD_APP, this.handleProductsListUpdate); 
  }

  private handleProductsListUpdate = (e: CustomEvent<AppLoadEventData>) => {
    const { products } = e.detail;
    this.update(products.length);
  }
}