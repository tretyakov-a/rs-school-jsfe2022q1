import './search-filter.css';
import { selectFrom } from '@common/utils';
import { View } from '@view/view';

export class SearchFilterView implements View<void> {

  public draw(): void {
    const fragment = document.createDocumentFragment();
    const searchFilterTemp = selectFrom(document)('#searchFilterTemp') as HTMLTemplateElement;
    const searchFilterClone = searchFilterTemp.content.cloneNode(true) as HTMLElement;

    fragment.append(searchFilterClone);
    selectFrom(document)('.source-filters__wrapper').append(fragment);
  }
}
