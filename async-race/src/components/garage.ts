import { Component, ComponentProps } from '@core/component';
import { EVENT } from '@common/constants';
import { AppLoadEventData } from './app';
import { GaragePageView } from '@views/pages/garage-page';

export class GaragePage extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: GaragePageView,
    });

    
    this.onLoadingStart();
    this.on(EVENT.LOAD_APP, this.handleAppLoad);
  }
  
  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    console.log(e.detail)
    this.onLoadingEnd(e.detail);
  }

}