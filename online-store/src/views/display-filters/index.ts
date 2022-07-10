import './display-filters.scss';
import { View } from '@core/view';
import displayFiltersTemplate from './display-filters.ejs';

export class DisplayFiltersView extends View {
  public render(): void {
    super.render(displayFiltersTemplate())
  }
}