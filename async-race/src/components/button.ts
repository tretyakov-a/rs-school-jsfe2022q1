import { Component, ComponentProps } from "@core/component";
import { ButtonView } from "@views/button";

export class Button extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ButtonView
    })
  }
  
  afterRender() {
    super.afterRender();
    
    this.getRoot().addEventListener('click', this.onClick);
  }

  protected onClick = (e: Event): void => {
    this.handlers?.onClick(e);
  }

  protected getIcon() {
    const icon = this.getComponent('icon');
    if (icon !== undefined && !Array.isArray(icon)) {
      return icon;
    }
  }
}