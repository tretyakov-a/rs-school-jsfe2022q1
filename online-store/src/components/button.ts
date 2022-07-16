import { Component } from "@core/component";

export class Button extends Component {
  
  afterRender() {
    super.afterRender();
    
    this.getRoot().querySelector('button')?.addEventListener('click', this.onClick);
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