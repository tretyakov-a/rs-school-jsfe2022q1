import { Component, ComponentProps } from "@core/component";
import { ProductsHeaderView } from "@views/products-header";
import { SelectView } from "@views/select";
import { RadioGroup } from './radio-group';

export class ProductsHeader extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsHeaderView,
    });

    this.components = [
      ['productsDisplayOptions', RadioGroup],
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