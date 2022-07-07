import './display-filters.scss';
import { View } from '@core/view';
import displayFiltersTemplate from './display-filters.ejs';

export class DisplayFiltersView extends View {
  constructor() {
    super({
      root: '.main__right',
      contentEl: '.display-filters',
    })
  }

  public render(): void {
    super.render(displayFiltersTemplate())
  }
}