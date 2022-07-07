import { CheckboxList } from "@components/checkbox-list";
import { Component, ComponentHandlers } from "@core/component";
import { FiltersListItemView } from "@views/filters-list-item";
import { FilterData } from "./filter";
import { Range } from "@components/range";

export type FilterContentComponent = typeof CheckboxList | typeof Range;

export class FiltersListItem extends Component {

  constructor(data: FilterData, filterComponent: FilterContentComponent, handlers: ComponentHandlers = {}) {
    super({
      view: new FiltersListItemView({ data }),
    });

    if (filterComponent) {
      this.components.filter = new filterComponent(
        data, this.getElement(), handlers
      );
    }
  }
}