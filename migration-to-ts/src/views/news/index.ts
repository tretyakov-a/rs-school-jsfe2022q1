import './news.css';
import { selectFrom } from '@common/utils';
import { NewsData } from '@components/news';
import { View, ViewOptions } from '@views/view';

export class NewsView extends View<NewsData> {
  constructor(options: ViewOptions<NewsData> = {}) {
    super({
      ...options,
      root: '.news',
      contentEl: '.news__container',
    })
  }

  render(options: ViewOptions<NewsData>): void {
    const { data } = options;
    if (data === undefined || super.render(options) || !Array.isArray(data)) return;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = selectFrom(document)('#newsItemTemp') as HTMLTemplateElement;

    data.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
      const select = selectFrom(newsClone);

      if (idx % 2) select('.news__item').classList.add('alt');

      const bgImgUrl = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      select('.news__meta-photo').style.backgroundImage = bgImgUrl;
      select('.news__meta-author').textContent = item.author || item.source.name;
      select('.news__meta-date').textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      select('.news__description-title').textContent = item.title;
      select('.news__description-source').textContent = item.source.name;
      select('.news__description-content').textContent = item.description;
      select('.news__read-more a').setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    
    (this.contentEl as HTMLElement).innerHTML = '';
    this.contentEl?.append(data.length === 0 ? 'No news' : fragment);
  }
}
