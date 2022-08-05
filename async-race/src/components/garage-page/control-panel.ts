import { ComponentProps } from '@core/component';
import { ControlPanelView } from '@views/pages/garage-page/control-panel';
import { EVENT } from '@common/constants';
import { ComponentWithOverlay } from '@components/component-with-overlay';

export class ControlPanel extends ComponentWithOverlay {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ControlPanelView,
    });

    this.on(EVENT.RACE_END, this.hideOverlay);
  }
  
  protected render(): string {
    const {
      handleRaceClick,
      handleResetClick,
      handleGenerateCarsClick } = this;
    return super.render({
      raceHandler: handleRaceClick,
      resetHandler: handleResetClick,
      generateCarsHandler: handleGenerateCarsClick,
    });
  }

  private handleRaceClick = (): void => {
    console.log('START RACE');
    this.emit(EVENT.START_RACE);
    this.showOverlay();
  }

  private handleResetClick = (): void => {
    console.log('RESET CARS');
    this.emit(EVENT.RESET_CARS);
  }

  private handleGenerateCarsClick = (): void => {
    console.log('GENERATE CARS');
  }
}