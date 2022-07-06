import { selectFrom } from "@common/utils";
import { Component, ComponentHandlers } from "@components/component";
import { View } from "@views/view";

export class Button extends Component {
  constructor(handlers: ComponentHandlers = {}, view: View) {
    super({ handlers, view });

    selectFrom(this.getRoot())('button')
      .addEventListener('click', () => this.onClick());
  }

  protected onClick = (): void => {
    (this.props.handlers?.onClick as () => void)();
  }
}