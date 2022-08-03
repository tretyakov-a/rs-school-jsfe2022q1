import { Component, ComponentProps } from '@core/component';
import { EVENT } from '@common/constants';
import { AppLoadEventData } from '@components/app';
import { GarageRaceView } from '@views/pages/garage-page/garage-race';

export class GarageRace extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: GarageRaceView,
    });

    
    this.onLoadingStart();
    this.on(EVENT.LOAD_APP, this.handleAppLoad);
  }
  
  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    this.onLoadingEnd(e.detail);
  }

}