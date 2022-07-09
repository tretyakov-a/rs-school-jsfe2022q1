import { selectFrom } from "@common/utils";
import { Component, ComponentProps } from "@core/component";

export class Button extends Component {
  constructor(props: ComponentProps) {
    super(props);

    this.update();
  }

  protected update(): void {
    super.update();

    selectFrom(this.getRoot())('button').addEventListener('click', () => this.onClick());
  }

  protected onClick = (): void => {
    this.handlers?.onClick();
  }
}