import { Component, ComponentProps } from '@core/component';
import { ControlPanelView } from '@views/pages/garage-page/control-panel';

export class ControlPanel extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ControlPanelView,
    });
  }
  
  protected render(): string {
    return super.render(this);
  }

  private raceHandler = (e: Event): void => {
    console.log('START RACE');
  }

  private resetHandler = (e: Event): void => {
    console.log('RESET CARS');
  }

  private generateCarsHandler = (e: Event): void => {
    console.log('GENERATE CARS');
  }
}