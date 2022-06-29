import './spinner.css';
import { View } from '@views/view';
import { selectFrom } from '@common/utils';

export class SpinnerView extends View<void> {
  
  render(): HTMLElement {
    const spinnerTemp = selectFrom(document)('#spinnerTemp') as HTMLTemplateElement;
    const spinnerClone = spinnerTemp.content.cloneNode(true) as HTMLElement;
    this.root = spinnerClone;
    return this.root;
  }
}
