import { Component, ComponentHandlers } from "@core/component";
import { FiltersListItemView } from "@views/filters-list-item";
import { FilterData } from "./filter";
import { FiltersList } from "./filters-list";

export class FiltersListItem extends Component {

  constructor(data: FilterData, handlers: ComponentHandlers = {}) {
    super({
      view: new FiltersListItemView({ data }),
    });

    const filterComponent = FiltersList.getFilterComponent(data.name);
    if (filterComponent) {
      this.components.filter = new filterComponent(
        data, this.getElement(), handlers
      );
    }
  }
}