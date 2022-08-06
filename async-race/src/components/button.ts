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
    if (this.handlers.onClick)
      this.handlers.onClick(e);
  }

  public enable() {
    this.getRoot().classList.remove('button_disabled');
  }

  public disable() {
    this.getRoot().classList.add('button_disabled');
  }

  protected getIcon() {
    const icon = this.getComponent('icon');
    if (icon !== undefined && !Array.isArray(icon)) {
      return icon;
    }
  }
}