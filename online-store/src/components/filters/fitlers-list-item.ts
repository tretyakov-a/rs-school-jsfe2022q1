import { Component, ComponentHandlers } from "@core/component";
import { FiltersListItemView } from "@views/filters-list-item";
import { CheckboxFilter } from "./checkbox-filter";
import { FilterData } from "./filter";
import { RangeFilter } from "./range-filter";

type FilterComponent = typeof RangeFilter | typeof CheckboxFilter;

const filters: Record<string, FilterComponent> = {
  'price': RangeFilter,
  'brand': CheckboxFilter,
  'color': CheckboxFilter,
}

export class FiltersListItem extends Component<FilterData> {

  constructor(data: FilterData, handlers: ComponentHandlers = {}) {
    super({
      view: new FiltersListItemView({ data }),
    });

    const filterComponent = this.getFilterComponent(data.name);
    if (filterComponent) {
      this.components.filter = new filterComponent(
        data, this.getElement(), handlers
      );
    }
  }

  private getFilterComponent(name: string): FilterComponent | undefined {
    return filters[name];
  }
}