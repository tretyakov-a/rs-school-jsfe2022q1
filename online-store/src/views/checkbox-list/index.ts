import './checkbox-list.scss';
import checkboxListTemplate from './checkbox-list.ejs';
import { View, ViewOptions } from '@core/view';
import { FilterData } from "@components/filters/filter";

export class CheckboxListView extends View<FilterData> {
  public render(options: ViewOptions<FilterData>): void {
    (this.contentEl as HTMLElement).innerHTML = checkboxListTemplate(options.data);
  }  
}
