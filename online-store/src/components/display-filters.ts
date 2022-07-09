import { Component, ComponentProps } from "@core/component";
import { DisplayFiltersView } from "@views/display-filters";
import { SelectView } from "@views/select";
import { RadioGroup } from './radio-group';

export class DisplayFilters extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: DisplayFiltersView,
    });

    this.components = [
      ['productViewFilter', RadioGroup],
      ['productSortFilter', Component, {
        viewConstructor: SelectView,
        viewOptions: {
          mountPoint: '.products-sort-filter'
        }
      }],
    ];
    
    this.update();
  }
}