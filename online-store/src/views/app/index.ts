import { View } from '@core/view';
import { Component } from '@core/component';
import { FooterView } from '@views/footer';
import { HeaderView } from '@views/header';
import { Alert } from '@components/alert';
import { Router } from '@components/router';
import { CartPageView } from '@views/pages/cart-page';
import { ProductPage } from '@components/product-page';
import { ShopPage } from '../../components/shop-page';

export class AppView extends View {

  public render(): string {
    return super.render(`
      ${this.renderChild('alert', Alert)}
      ${this.renderChild('header', Component, {
        viewConstructor: HeaderView
      })}
      <main class="main">
        ${this.renderChild('router', Router, {
          viewOptions: {
            root: '.main',
          },
          data: {
            routes: {
              '#': ['shopPage', ShopPage],
              '#cart': ['cartPage', Component, {
                viewConstructor: CartPageView
              }],
              '#product': ['productPage', ProductPage]
            }
          }
        })}
      </main>
      ${this.renderChild('footer', Component, {
        viewConstructor: FooterView,
      })}
    `);
  }
}