import { Component, ComponentProps } from '@core/component';
import { ProductPageView } from '@views/pages/product-page';
import { ActiveRoute } from '@common/active-route';

export class ProductPage extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductPageView,
    });

    console.log(ActiveRoute.getQueryParams());
  }
}
