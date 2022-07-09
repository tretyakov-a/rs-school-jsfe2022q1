import './select.scss';
import selectTemplate from './select.ejs';
import { View } from '@core/view';

export class SelectView extends View {
  
  public render(): void {
    super.render(selectTemplate());
  }  
}