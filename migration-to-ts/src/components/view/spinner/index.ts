import './spinner.css';
import { View } from '@view/view';
import { selectFrom } from '@common/utils';

export class SpinnerView implements View<void> {
  
  draw(): HTMLElement {
    const spinnerTemp = selectFrom(document)('#spinnerTemp') as HTMLTemplateElement;
    const spinnerClone = spinnerTemp.content.cloneNode(true) as HTMLElement;
    return spinnerClone;
  }
}
