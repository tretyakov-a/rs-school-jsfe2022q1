import './main.scss';
import { View } from '@core/view';
import mainTemplate from './main.ejs';

export class MainView extends View {
  
  public render(): void {
    const main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = mainTemplate({ title: 'QudroShop' });
    super.render(main);
  }
}