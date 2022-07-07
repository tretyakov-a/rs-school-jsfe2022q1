import './sources.css';
import { selectFrom } from '@common/utils';
import { SourceData } from '@components/sources';
import { View, ViewOptions } from '@views/view';

export class SourcesView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      root: '.sources',
      contentEl: '.sources__container'
    })
  }
  
  render(data: SourceData[]) {
    if (data === undefined || !Array.isArray(data)) return;
    
    if (data.length === 0) {
      return super.render('No sources');
    }
    
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = selectFrom(document)('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      const select = selectFrom(sourceClone);

      select('.source__item-name').textContent = item.name;
      select('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });
    super.render(fragment);
  }
}
