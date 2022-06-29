import './sources.css';
import { selectFrom } from '@common/utils';
import { SourceData } from '@components/sources';
import { View, ViewOptions } from '@views/view';

export class SourcesView extends View<SourceData> {
  render(options: ViewOptions<SourceData> ) {
    const { data } = options;
    if (!data || super.render(options) || !Array.isArray(data)) return;
    
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = selectFrom(document)('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      const select = selectFrom(sourceClone);

      select('.source__item-name').textContent = item.name;
      select('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    (this.contentEl as HTMLElement).innerHTML = '';
    this.contentEl?.append(data.length === 0 ? 'No sources' : fragment);
  }
}
