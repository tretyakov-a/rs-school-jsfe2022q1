import './checkbox-list.scss';
import checkboxListTemplate from './checkbox-list.ejs';
import { View } from '@core/view';
import { CheckboxListOptions } from '@components/checkbox-list';

export class CheckboxListView extends View {
  public render(data: CheckboxListOptions): void {
    super.render(checkboxListTemplate(data));
  }  
}
