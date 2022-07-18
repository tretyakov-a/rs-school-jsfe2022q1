import { Component, ComponentProps } from '@core/component';
import { ProductPageView } from '@views/pages/product-page';
import { ActiveRoute } from '@common/active-route';
import { EVENT } from '@common/constants';
import { AppLoadEventData } from './app';

export class ProductPage extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductPageView,
    });

    
    this.onLoadingStart();
    this.on(EVENT.LOAD_APP, this.handleAppLoad);
  }
  
  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    const { products } = e.detail;
    const { id } = ActiveRoute.getQueryParams();

    const product = products.find((item => item.id === id));
    if (product === undefined) {
      return ActiveRoute.change(`not-found`);
    }
    this.onLoadingEnd({ ...e.detail, product });
  }

}
