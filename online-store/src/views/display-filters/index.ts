import './display-filters.scss';
import { View, ViewOptions } from '@core/view';
import displayFiltersTemplate from './display-filters.ejs';

export class DisplayFiltersView extends View<void> {
  constructor() {
    super({
      root: '.main__right',
      contentEl: '.display-filters',
    })
  }

  public render(): void {
    // const container = document.createElement('div');
    // container.className = 'display-filters';
    // container.innerHTML = displayFiltersTemplate();
    (this.contentEl as HTMLElement).innerHTML = displayFiltersTemplate();
  }
}