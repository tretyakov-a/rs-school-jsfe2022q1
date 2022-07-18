import { Component, ComponentProps } from "@core/component";
import { FiltersListItemView } from "@views/filters/filters-list-item";
import { selectFrom } from "@common/utils";
import { FilterViewOptions } from "./filter";
import { EVENT } from '@common/constants';

export type FilterItemViewOptions = FilterViewOptions & {
  isExpandable: boolean;
  isExpanded: boolean;
  filterStyle: string;
}

export type FilterItemProps = ComponentProps & {
  data: FilterItemViewOptions;
}

export class FiltersListItem extends Component {
  private isExpanded: boolean;

  constructor(props: FilterItemProps) {
    super({
      ...props,
      viewConstructor: FiltersListItemView,
    });
    const { data } = props;
    if (data === undefined) throw new TypeError();

    this.isExpanded = data.isExpanded;
  }

  private handleExpand = (e: Event) => {
    const checkbox = e.currentTarget;
    if (checkbox instanceof HTMLInputElement) {
      this.isExpanded = !checkbox.checked;
      this.emit(EVENT.CHANGE_FILTER_APPEARANCE, {
        filterName: checkbox.name,
        isExpanded: this.isExpanded,
      });
    }
  }

  public afterRender(): void {
    super.afterRender();

    selectFrom(this.getRoot())('.filter__expander').addEventListener('change', this.handleExpand);
  }
}