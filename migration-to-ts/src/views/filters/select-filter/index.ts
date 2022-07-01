import './select-filter.css';
import { addOptions, selectFrom } from '@common/utils';
import { View, ViewOptions } from '@views/view';
import { FilterOptions } from '@components/filter/filter';

export class SelectFilterView extends View<FilterOptions> {
  constructor(options: ViewOptions<FilterOptions> = {}) {
    super({
      ...options,
      root: '.source-filters__container',
    })
  }
  
  public render(options: ViewOptions<FilterOptions>): void {
    const { name = 'unknown', data = [] } = options.data as FilterOptions;
    const selectFilterTemp = selectFrom(document)('#selectFilterTemp') as HTMLTemplateElement;
    const selectFilterClone = selectFilterTemp.content.cloneNode(true) as HTMLElement;
    const select = selectFrom(selectFilterClone);
    const selectEl = select('select');  

    selectEl.setAttribute('name', name);
    addOptions(selectEl, data as string[]);
    select('.source-filters__item-label').textContent = `${name[0].toUpperCase()}${name.slice(1)}:`;

    this.contentEl?.append(selectFilterClone);
  }
}
