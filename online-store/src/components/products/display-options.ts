import { Component, ComponentProps } from "@core/component";
import { DisplayOptionsView } from "@views/products/display-options";
import { selectFrom } from '@common/utils';
import { DISPLAY_OPTION_DEFAULT, EVENT } from '@common/constants';
import { DISPLAY_OPTION } from '@common/constants';
import { AppLoadEventData } from "@components/app";

export type DisplayOptionsViewData = {
  inputName: string;
  values: DISPLAY_OPTION[];
  checked: DISPLAY_OPTION;
}

export class DisplayOptions extends Component {
  private radioElements: NodeList | null;
  static readonly nameAttrValue: string = 'display-options';

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: DisplayOptionsView,
    });
    
    this.radioElements = null;

    this.on(EVENT.LOAD_APP, this.handleAppLoad);
  }

  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    const { displayOption } = e.detail.state.appearance;
    this.radioElements?.forEach((el) => {
      if (el instanceof HTMLInputElement && el.getAttribute('value') === displayOption) {
        el.checked = true;
      }
    })
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
    this.radioElements = this.getRoot().querySelectorAll(`input[name="${DisplayOptions.nameAttrValue}"]`);
    selectFrom(this.getRoot())('.radio-group__form').addEventListener('change', this.onChange);
  }
}