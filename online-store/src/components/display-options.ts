import { Component, ComponentProps } from "@core/component";
import { DisplayOptionsView } from "@views/display-options";
import { selectFrom } from '@common/utils';
import { EVENT } from '@common/constants';

export type DisplayOptionsViewData = {
  name: string;
}

export class DisplayOptions extends Component {
  static readonly nameAttrValue: string = 'display-options';

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: DisplayOptionsView,
    });

    this.update({ name: DisplayOptions.nameAttrValue });
  }

  private onChange = (e: Event) => {
    const form = e.currentTarget;
    if (form !== null && form instanceof HTMLFormElement) {
      const displayOption = (new FormData(form)).get(DisplayOptions.nameAttrValue);
      this.emit(EVENT.CHANGE_DISPLAY_OPTION, displayOption);
    }
  }

  protected update(data: DisplayOptionsViewData): void {
    super.update(data);

    selectFrom(this.getMountPoint())('.radio-group__form').addEventListener('change', this.onChange);
  }
}