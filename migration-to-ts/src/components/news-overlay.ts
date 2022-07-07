import { View } from "@views/view";
import { Component } from "./component";

export class NewsOverlay extends Component {
  constructor() {
    super({
      view: new View({
        root: '.news__overlay',
      })
    });
  }

  show(): void {
    this.getRoot().classList.add('news__overlay_show');
    this.onLoadingStart();
  }

  hide(): void {
    this.getRoot().classList.remove('news__overlay_show');
    this.onLoadingEnd();
  }
}
