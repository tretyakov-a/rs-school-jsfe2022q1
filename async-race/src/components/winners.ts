import { Component, ComponentProps } from '@core/component';
import { EVENT } from '@common/constants';
import { AppLoadEventData } from './app';
import { WinnersPageView } from '@views/pages/winners-page';

export class WinnersPage extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: WinnersPageView,
    });

    
    this.onLoadingStart();
    this.on(EVENT.LOAD_APP, this.handleAppLoad);
  }
  
  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {

    this.onLoadingEnd(e.detail);
  }

}