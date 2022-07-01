import { Button } from "./button";

export class ResetButton extends Button {

  protected onClick = (): void => {
    this.props.handlers?.onResetBtnClick();
  }
}