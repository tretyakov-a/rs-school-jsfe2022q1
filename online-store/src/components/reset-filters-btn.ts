import { EVENT } from "@common/constants";
import { ComponentProps } from "@core/component";
import { ResetFiltersBtnView } from "@views/reset-filters-btn";
import { Button } from "./button";

export class ResetFilterBtn extends Button {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ResetFiltersBtnView,
    });
  }

  protected onClick = async () => {
    this.emit(EVENT.RESET_FILTERS);
  }
}