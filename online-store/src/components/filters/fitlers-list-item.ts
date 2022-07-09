import { Component, ComponentProps } from "@core/component";
import { FiltersListItemView } from "@views/filters-list-item";

export type FilterItemOptions = {
  filterComponent: typeof Component;
  title: string;
}

export type FilterItemProps = ComponentProps & {
  componentOptions?: FilterItemOptions
}

export class FiltersListItem extends Component {
  private filterComponent: typeof Component;

  constructor(props: FilterItemProps) {
    super({
      ...props,
      viewConstructor: FiltersListItemView,
    });
    const { componentOptions } = props;
    if (!componentOptions) throw new TypeError();

    this.filterComponent = componentOptions.filterComponent || Component;

    this.components = [
      ['filter', this.filterComponent, {
        componentOptions,
        handlers: this.handlers,
        viewOptions: {
          mountPoint: '.filter__content'
        }
      }]
    ]

    this.update(componentOptions);
  }
}