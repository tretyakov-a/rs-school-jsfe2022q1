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
    if (super.render(options)) return;


    const fragment = document.createDocumentFragment();
    const left = document.createElement('div');
    left.className = 'source-filters__left';

    const right = document.createElement('div');
    right.className = 'source-filters__right';
    fragment.append(left, right);

    (this.contentEl as HTMLElement).innerHTML = '';
    this.contentEl?.append(fragment);
  }
}