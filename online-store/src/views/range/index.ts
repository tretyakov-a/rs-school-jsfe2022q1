import './range.scss';
import rangeTemplate from './range.ejs';
import { View } from '@core/view';
import { RangeOptions } from '@components/range';

export class RangeView extends View {
  public render(data: RangeOptions): void {
    super.render(rangeTemplate(data));
  }  
}