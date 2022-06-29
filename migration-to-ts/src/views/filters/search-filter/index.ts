import './search-filter.css';
import { selectFrom } from '@common/utils';
import { View } from '@views/view';

export class SearchFilterView extends View<void> {

  public render(): void {
    const searchFilterTemp = selectFrom(document)('#searchFilterTemp') as HTMLTemplateElement;
    const searchFilterClone = searchFilterTemp.content.cloneNode(true) as HTMLElement;
    
    this.contentEl?.append(searchFilterClone);
  }
}
