import './header.scss';
import { View } from '@core/view';
import headerTemplate from './header.ejs';

export class HeaderView extends View {

  public render(): void {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = headerTemplate({ title: 'QudroShop' });
    super.render(header);
  }
}