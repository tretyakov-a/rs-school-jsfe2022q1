import { EVENT } from "@common/constants";
import { Component, ComponentProps } from "@core/component";
import { AlertView } from "@views/alert";

export class Alert extends Component {
  static hideDelay: number = 3000;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: AlertView,
    });

    this.on(EVENT.SHOW_ALERT, this.handleShowAlert);
  }

  private handleShowAlert = (e: CustomEvent<string>) => {
    const message = e.detail;
    this.update({ message });
    this.getRoot().classList.remove('alert_hide');
    this.getRoot().classList.add('alert_show');
    setTimeout(() => {
      this.getRoot().classList.remove('alert_show');
      this.getRoot().classList.add('alert_hide');
    }, Alert.hideDelay);
  }
}