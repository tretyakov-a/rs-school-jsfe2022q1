import { Component, ComponentProps } from '@core/component';
import { EVENT } from '@common/constants';
import { AppLoadEventData } from '@components/app';
import { GarageRaceView } from '@views/pages/garage-page/garage-race';
import { CarsListItem } from './cars-list-item';
import { DriveResult } from '@common/car-service';
import { ComponentWithOverlay } from '@components/component-with-overlay';

export class GarageRace extends ComponentWithOverlay {
  private cars: CarsListItem[];

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: GarageRaceView,
    });

    this.cars = [];

    this.onLoadingStart();
    this.on(EVENT.LOAD_APP, this.handleAppLoad);
    this.on(EVENT.GARAGE_CHANGE_PAGE, this.handleChangePage)
  }
  
  protected afterRender(): void {
    super.afterRender();

    const carListItems = this.getComponent('cars') as CarsListItem[] | CarsListItem || [];
    this.cars = !Array.isArray(carListItems)
      ? [ carListItems ]
      : carListItems;

    this.emit(EVENT.CARS_AFTER_RENDER, { carItems: this.cars });
  }

  private handleAppLoad = (e: CustomEvent<AppLoadEventData>) => {
    this.onLoadingEnd(e.detail);
  }

  private handleChangePage = () => {
    this.showOverlay();
  }
}