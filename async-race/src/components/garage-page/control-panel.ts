import { ComponentProps } from '@core/component';
import { ControlPanelView } from '@views/pages/garage-page/control-panel';
import { EVENT } from '@common/constants';
import { ComponentWithOverlay } from '@components/component-with-overlay';
import { AppState } from '@components/app';
import { Button } from '@components/button';

export class ControlPanel extends ComponentWithOverlay {
  public buttons: Record<string, Button>;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ControlPanelView,
    });

    this.buttons = {};
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

  protected afterRender(): void {
    super.afterRender();

    ['race', 'reset', 'generate'].forEach((name) => {
      const btn = this.getComponent(name);
      if (!Array.isArray(btn) && btn instanceof Button)
        this.buttons[name] = btn;
    });

    this.emit(EVENT.GET_APP_STATE, { onComplete: (state: AppState) => {
      const { isRaceInProgress } = state;
      if (isRaceInProgress) {
        this.showOverlay();
      }
    }})
  }

  private handleRaceClick = (): void => {
    this.emit(EVENT.START_RACE);
    this.showOverlay();
  }

  private handleResetClick = (): void => {
    this.showOverlay();
    this.emit(EVENT.RESET_CARS, { onComplete: (err: Error | null) => {
      this.hideOverlay();
    }});
  }

  private handleGenerateCarsClick = (): void => {
    this.showOverlay();
    this.emit(EVENT.GENERATE_CARS, { onComplete: (err: Error | null) => {
      this.hideOverlay();
    }});
  }
}