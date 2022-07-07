import './range.scss';
import rangeTemplate from './range.ejs';
import { View, ViewOptions } from '@core/view';
import { RangeOptions } from '@components/range';

export class RangeView extends View<RangeOptions> {
  public render(options: ViewOptions<RangeOptions>): void {
    (this.contentEl as HTMLElement).innerHTML = rangeTemplate(options.data);
  }  
}