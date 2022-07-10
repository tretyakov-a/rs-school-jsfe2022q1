import { Component, ComponentProps } from "@core/component";
import { ProductsHeaderView } from "@views/products-header";
import { DisplayOptions } from './display-options';
import { ProductsSort } from "./products-sort";

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
      ['productsSort', ProductsSort, {
        viewOptions: {
          mountPoint: '.products__sort'
        }
      }],
    ];
    
    this.update();
  }
}