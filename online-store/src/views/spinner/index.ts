import './spinner.scss';
import { View } from '@core/view';

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
