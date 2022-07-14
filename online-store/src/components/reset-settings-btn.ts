import { EVENT } from "@common/constants";
import { ComponentProps } from "@core/component";
import { ResetSettingsBtnView } from "@views/reset-setting-btn";
import { Button } from "./button";

export class ResetSettingsBtn extends Button {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ResetSettingsBtnView,
    });
  }

  protected onClick = async () => {
    this.emit(EVENT.RESET_SETTINGS);
  }
}