import { Component, ComponentHandlers } from "@core/component";
import { DisplayFiltersView } from "@views/display-filters";
import { SelectView } from "@views/select";
import { RadioGroup } from './radio-group';

export class DisplayFilters extends Component {

  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new DisplayFiltersView(),
    });

    this.components = {
      productViewFilter: new RadioGroup(this.getRoot()),

      productSortFilter: new Component({
        view: new SelectView({
          root: this.getRoot(),
          contentEl: '.products-sort-filter',
        })
      })
    }
  }
}