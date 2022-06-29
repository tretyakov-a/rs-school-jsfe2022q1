import './select-filter.css';
import { addOptions, selectFrom } from '@common/utils';
import { View, ViewOptions } from '@views/view';

export class SelectFilterView extends View<string> {

  public render(options: ViewOptions<string>): void {
    const { name = 'unknown', data = [] } = options;
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
