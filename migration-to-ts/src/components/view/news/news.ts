import './news.css';
import { selectFrom } from '@common/utils';

interface NewsData {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

class News {
  draw(data: NewsData[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = selectFrom(document)('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx) => {
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

    selectFrom(document)('.news').innerHTML = '';
    selectFrom(document)('.news').appendChild(fragment);
  }
}

export {
  NewsData,
  News,
}
