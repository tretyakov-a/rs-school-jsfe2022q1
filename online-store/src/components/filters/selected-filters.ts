import { Component, ComponentProps } from "@core/component";
import { EVENT } from "@common/constants";
import { SelectedFiltersView } from "@views/filters/selected-filters";
import { Filter } from "./filter";

export class SelectedFilters extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: SelectedFiltersView,
    });
    
    this.on(EVENT.CHANGE_FILTERS, this.handleFiltersChange);
    this.onLoadingStart();
  }

  protected afterRender(): void {
    super.afterRender()  ;

    this.getRoot().addEventListener('click', this.handleClick);
  }

  private handleClick = (e: Event) => {
    const el = e.target;
    if (el == null || !(el instanceof HTMLElement)) return;

    const dataEl = el.closest('.selected-filters__item');
    if (dataEl === null) return;

    const filterName = dataEl.getAttribute('data-filter-name');
    this.emit(EVENT.RESET_FILTER, { filterName });
  }

  public handleFiltersChange = (e: CustomEvent<Filter[]>): void => {
    this.onLoadingEnd(e.detail);
  }
}