import { NewsView } from '@views/news';
import { Component } from './component';

export interface NewsData {
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

export class News extends Component<NewsData> {
  constructor(data?: NewsData[]) {
    super(new NewsView({ data, root: '.news' }));
  }
}