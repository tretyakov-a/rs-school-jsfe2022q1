import { selectFrom } from "@common/utils";
import { Component, ComponentProps } from "@components/component";

export class Button extends Component<string> {
  constructor(props: ComponentProps<string>) {
    super(props);

    selectFrom(this.getRoot())('button')
      .addEventListener('click', () => this.onClick());
  }

  protected onClick = (): void => {}
}