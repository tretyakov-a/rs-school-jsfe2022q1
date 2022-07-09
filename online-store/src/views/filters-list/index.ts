import './filters-list.scss';
import { View, ViewOptions } from '@core/view';

export class FiltersListView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      mountPoint: '.filters-list',
    })
  }
}