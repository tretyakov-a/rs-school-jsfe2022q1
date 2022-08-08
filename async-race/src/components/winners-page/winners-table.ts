import { ComponentProps, ComponentHandler } from '@core/component';
import { EVENT } from '@common/constants';
import { WinnersTableView } from '@views/pages/winners-page/winners-table/index';
import { WinnersResponseData } from '@common/car-winners-service';
import { ComponentWithOverlay } from '@components/component-with-overlay';
import { CarData } from '@common/car';
import { SortOrder, WinnersSortType } from '@common/car-service';

export type SortState = {
  type: WinnersSortType;
  order: SortOrder;
}

export type WinnersLoadEventData = WinnersResponseData & {
  winnersPageNumber: number;
  isRaceInProgress: boolean;
  carsData: Record<string, CarData>;
  error: Error | null;
  sort: SortState | null;
  sortHandler: ComponentHandler;
}

export class WinnersTable extends ComponentWithOverlay {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: WinnersTableView,
    });

    this.onLoadingStart();
    this.emit(EVENT.GET_WINNERS);
    this.on(EVENT.LOAD_WINNERS, this.handleLoadWinners);
    this.on(EVENT.WINNERS_CHANGE_PAGE, this.handleChangePage);
  }

  protected afterRender(): void {
    super.afterRender();
  }

  private handleLoadWinners = (e: CustomEvent<WinnersLoadEventData>) => {
    this.onLoadingEnd({ ...e.detail, error: null, sortHandler: this.handleSort });
  }

  private handleSort = (e: Event) => {
    const el = e.target;
    if (el === null || !(el instanceof HTMLElement)) return;
    const sortEl = el.closest('.winners-table__sort-header');
    if (sortEl === null) return;
    const type = sortEl.getAttribute('data-sort-type');
    let order = sortEl.getAttribute('data-sort-order');
    if (type === null || order === null) return;
    order = order === 'default'
      ? 'ASC'
      : order === 'ASC' ? 'DESC' : 'ASC';
    this.emit(EVENT.GET_WINNERS, { type, order });
    this.handleChangePage();
  }

  private handleChangePage = () => {
    this.showOverlay();
  }
}