import './select-filter.css';
import { addOptions, selectFrom } from '@common/utils';
import { View, ViewOptions } from '@view/view';

export class SelectFilterView implements View<string> {

  public draw({ data, name = '' }: ViewOptions<string> = { data: [] }): void {
    const fragment = document.createDocumentFragment();
    const selectFilterTemp = selectFrom(document)('#selectFilterTemp') as HTMLTemplateElement;
    const selectFilterClone = selectFilterTemp.content.cloneNode(true) as HTMLElement;
    const select = selectFrom(selectFilterClone);
    const selectEl = select('select');

    selectEl.setAttribute('name', name);
    addOptions(selectEl, data);
    select('.source-filters__item-label').textContent = `${name[0].toUpperCase()}${name.slice(1)}:`;

    fragment.append(selectFilterClone);
    selectFrom(document)('.source-filters__wrapper').append(fragment);
  }
}
