import './spinner.css';
import { View } from '@views/view';
import { selectFrom } from '@common/utils';

export class SpinnerView extends View {
  
  render(): void {
    const spinnerTemp = selectFrom(document)('#spinnerTemp') as HTMLTemplateElement;
    const spinnerClone = spinnerTemp.content.cloneNode(true) as HTMLElement;
    super.render(spinnerClone);
  }
}
