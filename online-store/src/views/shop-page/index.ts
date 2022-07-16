import { View } from '@core/view';
import { Component } from '@core/component';
import { FooterView } from '@views/footer';
import { HeaderView } from '@views/header';
import { MainView } from '@views/main';
import { Alert } from '@components/alert';
import { Main } from '@components/main';

export class ShopPageView extends View {

  public render(): string {
    return super.render(`
      ${this.renderChild('alert', Alert)}
      ${this.renderChild('header', Component, {
        viewConstructor: HeaderView
      })}
      ${this.renderChild('main', Main, {
        viewConstructor: MainView
      })}
      ${this.renderChild('footer', Component, {
        viewConstructor: FooterView,
      })}
    `);
  }
}