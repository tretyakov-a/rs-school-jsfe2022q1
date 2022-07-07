import './radio-group.scss';
import radioGroupTemplate from './radio-group.ejs';
import { View } from '@core/view';

export class RadioGroupView extends View {

  public render(): void {
    super.render(radioGroupTemplate());
  }  
}