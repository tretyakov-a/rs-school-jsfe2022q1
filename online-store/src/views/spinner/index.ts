import './spinner.scss';
import { View } from '@core/view';
import { selectFrom } from '@common/utils';

export class SpinnerView extends View<void> {
  
  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'lds-ellipsis';
    container.innerHTML = `
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    `;
    return container;
  }
}
