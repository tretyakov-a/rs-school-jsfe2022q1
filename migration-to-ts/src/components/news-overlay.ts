import { View } from "@views/view";
import { Component } from "./component";
import { SpinnerView } from '@views/spinner';

export class NewsOverlay extends Component<HTMLElement> {
  constructor() {
    super({
      view: new View<HTMLElement>({
        root: '.news__overlay',
        data: (new SpinnerView()).render(),
      })
    });
  }

  show(): void {
    this.getRoot().classList.add('news__overlay_show');
  }

  hide(): void {
    this.getRoot().classList.remove('news__overlay_show');
  }
}
