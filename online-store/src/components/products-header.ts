import { Component, ComponentProps } from "@core/component";
import { ProductsHeaderView } from "@views/products-header";
import { SelectView } from "@views/select";
import { DisplayOptions } from './display-options';

export class ProductsHeader extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsHeaderView,
    });

    this.components = [
      ['productsDisplayOptions', DisplayOptions, {
        viewOptions: {
          mountPoint: '.products__display-options',
        }
      }],
      ['productsSort', Component, {
        viewConstructor: SelectView,
        viewOptions: {
          mountPoint: '.products__sort'
        }
      }],
    ];
    
    this.update();
  }
}