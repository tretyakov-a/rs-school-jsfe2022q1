import { NewsResponseData } from 'controller/loader';
import { Component, ComponentProps } from './component';

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

type GetNewsDataFunction = (sourceId: string, callback: (data: NewsResponseData) => void) => void;

export class News extends Component<NewsData> {
  private news: NewsData[];
  private getData: GetNewsDataFunction
  
  constructor(props: ComponentProps<NewsData>, getData: GetNewsDataFunction) {
    super(props);
    
    this.news = [];
    this.getData = getData;
  }

  public update(sourceId: string): void { 
    this.onLoadingStart();
    this.getData(sourceId, (data) => {
      this.news = data.articles ? data.articles : [];
      this.onLoadingEnd(this.news);
    });
  }
}