import './filters-form.css';
import { View, ViewOptions } from '@views/view';
import { SourceData } from '@components/sources';

export class FiltersFormView extends View<SourceData> {
  constructor(options: ViewOptions<SourceData> = {}) {
    super({
      ...options,
      root: '.source-filters', 
      contentEl: '.source-filters__container',
    })
  }
  render(options: ViewOptions<SourceData>) {
    return super.render(options);
  }
}