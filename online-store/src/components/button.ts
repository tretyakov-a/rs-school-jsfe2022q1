import { selectFrom } from "@common/utils";
import { Component, ComponentProps } from "@core/component";

export class Button extends Component {
  // constructor(props: ComponentProps) {
  //   super(props);

  //   this.update(props.data);
  // }

  protected update(data?: unknown): void {
    super.update(data);

    this.getMountPoint().querySelector('button')?.addEventListener('click', this.onClick);
  }

  protected onClick = (e: Event): void => {
    this.handlers?.onClick(e);
  }
}