import './sources.css';
import { selectFrom } from '@common/utils';

interface SourceData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

class Sources {
  draw(data: SourceData[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = selectFrom(document)('#sourceItemTemp') as HTMLTemplateElement;
    const sources = selectFrom(document)('.sources');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      const select = selectFrom(sourceClone);

      select('.source__item-name').textContent = item.name;
      select('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    sources.innerHTML = '';
    sources.append(data.length === 0 ? 'No sources' : fragment);
  }
}

export {
  SourceData,
  Sources,
};
