import { Component, ComponentHandlers } from "@core/component";
import { RadioGroupView } from "@views/radio-group";

export class RadioGroup extends Component {

  constructor(root: HTMLElement, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new RadioGroupView({
        root,
        contentEl: '.products-view-filter',
      })
    });
  }

}