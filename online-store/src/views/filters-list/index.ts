import './filters-list.scss';
// import filtersListTemplate from './filters-list.ejs';
import { View } from '@core/view';

export class FiltersListView extends View {
  constructor() {
    super({
      root: '.main__left',
      contentEl: '.filters-list',
    })
  }

  public render(): void {
    super.render();
  }
}