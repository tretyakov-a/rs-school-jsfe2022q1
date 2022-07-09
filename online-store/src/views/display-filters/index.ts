import './display-filters.scss';
import { View } from '@core/view';
import displayFiltersTemplate from './display-filters.ejs';

export class DisplayFiltersView extends View {
  constructor() {
    super({
      mountPoint: '.display-filters',
    })
  }

  public render(): void {
    super.render(displayFiltersTemplate())
  }
}