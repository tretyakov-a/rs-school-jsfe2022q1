import './spinner.scss';
import spinnerTemplate from './spinner.ejs';
import { View } from '@core/view';

export class SpinnerView extends View {
  
  render(): void {
    super.render(spinnerTemplate());
  }
}
