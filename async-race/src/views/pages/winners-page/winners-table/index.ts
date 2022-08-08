import './winners-table.scss';
import { ViewOptions } from '@core/view';
import { LoaderView } from '@core/loader-view';
import { WinnersLoadEventData } from '@components/winners-page/winners-table';
import { renderButtons, renderPaginator } from '@views/shared';
import { Component } from '@core/component';
import { LoadingOverlayView } from '@views/loading-overlay';
import { CarImg } from '@components/garage-page/car-img';
import { ITEMS_PER_PAGE } from '@common/constants';
import { WinnersSortType } from '@common/car-service';

export class WinnersTableView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.winners__content',
    })
  }

  private renderSortHeader(name: WinnersSortType, label: string, data: WinnersLoadEventData): string {
    const { sort, sortHandler } = data;
    const sortOrder = sort !== null && sort.type === name
      ? sort.order
      : 'default';
    const arrow = sortOrder !== 'default'
      ? sortOrder === 'ASC' 
        ? '<i class="fa-solid fa-arrow-down"></i>'
        : '<i class="fa-solid fa-arrow-up"></i>'
      : '';
    const content = `${label} <span class="winners-table__sort-mark">${arrow}</span>`; 
    return `
      <th
        class="winners-table__sort-header"
        data-sort-type="${name}"
        data-sort-order="${sortOrder}">
        ${renderButtons.call(this, 'winners-table', {
          'sort': { handler: sortHandler, content, classes: 'button_sort' },
        })}
      </th>`
  }
  
  private renderTable(data: WinnersLoadEventData): string {
    const { winners, carsData, winnersPageNumber } = data;
    const startPageNumber = (winnersPageNumber - 1) * ITEMS_PER_PAGE.WINNERS;
    const rowsHtml = winners.map((winner, index) => {
      const { id, time, wins } = winner;
      const { name, color } = carsData[id];
      const img = this.renderChild('carImg', CarImg, { viewOptions: { data: color } });
      return `<tr>
        <td>${startPageNumber + index + 1}</td>
        <td>${img}</td>
        <td>${name}</td>
        <td>${wins}</td>
        <td>${time}</td>
      </tr>`
    }).join('');
    
    return `
      <table class="winners-table">
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Model</th>
          ${this.renderSortHeader('wins', 'Wins', data)}
          ${this.renderSortHeader('time', 'Best time (s)', data)}
        </tr>
        ${rowsHtml}
      </table>
    `;
  }

  public render(data: WinnersLoadEventData): string {
    let html = '';
    if (data !== undefined) {
      const { error, winnersPageNumber, winnersAmount } = data;
      const renderWinnersPaginator = renderPaginator.bind(this, winnersPageNumber, winnersAmount, 'winners');
      html = !error
        ? `${renderWinnersPaginator()}
          <div class="winners__table-container">
            ${this.renderChild('overlay', Component, {
              viewConstructor: LoadingOverlayView
            })}
            ${this.renderTable(data)}
          </div>
          ${renderWinnersPaginator()}`
        : `Load error`;
    }

    return super.render((loader: string) => `
      <div class="winners__content">
        ${loader !== '' ? loader : html}
      </div>
    `);
  }
}