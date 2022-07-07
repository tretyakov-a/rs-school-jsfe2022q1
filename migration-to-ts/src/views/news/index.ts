import './news.css';
import { loadImage, selectFrom } from '@common/utils';
import { NewsData } from '@components/news';
import { View, ViewOptions } from '@views/view';
import newsPlaceholfer from '../../../assets/news_placeholder.png';

export class NewsView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      root: '.news',
      contentEl: '.news__container',
    })
  }

  render(data: NewsData[]): void {
    if (data === undefined || !Array.isArray(data)) return;

    if (data.length === 0) {
      return super.render('No news');
    }

    const fragment = document.createDocumentFragment();
    const newsItemTemp = selectFrom(document)('#newsItemTemp') as HTMLTemplateElement;

    data.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
      const select = selectFrom(newsClone);

      if (idx % 2) select('.news__item').classList.add('alt');

      const setBg = (el: HTMLElement) => (url: string) => el.style.backgroundImage = `url(${url})`;
      const setPhotoBg = setBg(select('.news__meta-photo'));
      setPhotoBg(newsPlaceholfer);
      
      loadImage(item.urlToImage)
        .then(setPhotoBg)
        .catch((error) => error);

      select('.news__meta-author').textContent = item.author || item.source.name;
      select('.news__meta-date').textContent = (item.publishedAt || '')
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      select('.news__description-title').textContent = item.title;
      select('.news__description-source').textContent = item.source.name;
      select('.news__description-content').textContent = item.description;
      select('.news__read-more a').setAttribute('href', item.url || '#');

      fragment.append(newsClone);
    });

    super.render(fragment);
  }
}
