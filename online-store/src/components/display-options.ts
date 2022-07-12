import { Component, ComponentProps } from "@core/component";
import { DisplayOptionsView } from "@views/display-options";
import { selectFrom } from '@common/utils';
import { DISPLAY_OPTION_DEFAULT, EVENT } from '@common/constants';
import { DISPLAY_OPTION } from '@common/constants';

export type DisplayOptionsViewData = {
  inputName: string;
  values: DISPLAY_OPTION[];
  checked: DISPLAY_OPTION;
}

export class DisplayOptions extends Component {
  static readonly nameAttrValue: string = 'display-options';

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: DisplayOptionsView,
    });
  }

  private onChange = (e: Event) => {
    const form = e.currentTarget;
    if (form !== null && form instanceof HTMLFormElement) {
      const displayOption = (new FormData(form)).get(DisplayOptions.nameAttrValue);
      this.emit(EVENT.CHANGE_DISPLAY_OPTION, displayOption);
    }
  }

  protected render(): string {
    return super.render({
      inputName: DisplayOptions.nameAttrValue,
      values: Object.values(DISPLAY_OPTION),
      checked: DISPLAY_OPTION_DEFAULT,
    });
  }
  
  protected afterRender() {
    super.afterRender();
    selectFrom(this.getRoot())('.radio-group__form').addEventListener('change', this.onChange);
  }
}