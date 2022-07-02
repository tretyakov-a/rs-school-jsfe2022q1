import { Loader } from './loader';

declare const NEWS_APY_KEY: string;

class AppLoader extends Loader {
  constructor() {
    // super('https://newsapi.org/v2/', {
    //   apiKey: NEWS_APY_KEY,
    // });
    super('https://nodenews.herokuapp.com/', {
      apiKey: NEWS_APY_KEY,
    });
  }
}

export default AppLoader;
