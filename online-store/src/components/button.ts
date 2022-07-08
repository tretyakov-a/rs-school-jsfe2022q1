import { selectFrom } from "@common/utils";
import { Component, ComponentHandlers } from "@core/component";
import { View } from "@core/view";

export class Button extends Component {
  constructor(handlers: ComponentHandlers = {}, view: View) {
    super({ handlers, view });

    selectFrom(this.getRoot())('button')
      .addEventListener('click', () => this.onClick());
  }

  protected onClick = (): void => {
    this.props.handlers?.onClick();
  }
}