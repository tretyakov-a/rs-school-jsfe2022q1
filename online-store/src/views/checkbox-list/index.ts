import './checkbox-list.scss';
import checkboxListTemplate from './checkbox-list.ejs';
import { View } from '@core/view';
import { FilterData } from "@components/filters/filter";

export class CheckboxListView extends View {

  public render(data: FilterData): void {
    super.render(checkboxListTemplate(data));
  }  
}
