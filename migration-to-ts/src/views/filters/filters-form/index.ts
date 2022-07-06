import './filters-form.css';
import { View, ViewOptions } from '@views/view';

export class FiltersFormView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      root: '.source-filters', 
      contentEl: '.source-filters__container',
    })
  }

  render(options: ViewOptions) {
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