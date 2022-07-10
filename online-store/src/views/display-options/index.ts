import './display-options.scss';
import radioGroupTemplate from './display-options.ejs';
import { View } from '@core/view';
import { DisplayOptionsViewData } from '@components/display-options';

export class DisplayOptionsView extends View {
  public render(data: DisplayOptionsViewData): void {
    super.render(radioGroupTemplate(data));
  }  
}