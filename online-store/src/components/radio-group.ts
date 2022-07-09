import { Component, ComponentProps } from "@core/component";
import { RadioGroupView } from "@views/radio-group";

export class RadioGroup extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: RadioGroupView,
      viewOptions: {
        mountPoint: '.products-view-filter',
      }
    });

    this.update();
  }

}