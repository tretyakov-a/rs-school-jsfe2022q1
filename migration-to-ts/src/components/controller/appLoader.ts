import { Loader } from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'b0618380f58c4e71921f37129f11417f',
    });
  }
}

export default AppLoader;
