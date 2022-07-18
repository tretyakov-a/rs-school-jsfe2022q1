import './cart-page.scss';
import { ViewOptions } from '@core/view';
import { AppLoadEventData } from '@components/app';
import { LoaderView } from '@core/loader-view';
import { CartProduct } from '../../../components/cart-product';
import { totalCartSum } from '@common/utils';

export class CartPageView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.cart-details',
    })
  }
  
  private renderProducts(data: AppLoadEventData): string {
    const { state: { productInCartIds }, products } = data;
    const items = products
      .filter(({ id }) => Object.keys(productInCartIds).includes(id))
      .map((product) => this.renderChild('products', CartProduct, {
        data: { product },
        viewOptions: {
          data: {
            product,
            productsAmount: productInCartIds[product.id]
          },
        }
      }));
    return `
      <ul class="cart-details__products cart-details-products">
        ${items.join('')}
      </ul>
    `;
  }

  private renderCart(data: AppLoadEventData): string {
    const { state: { productInCartIds }, products } = data;
    const totalNumber = Object.keys(productInCartIds).reduce((sum, id) => sum + productInCartIds[id], 0);
    const totalSum = totalCartSum(productInCartIds, products);
    const content = totalNumber !== 0
      ? `<div class="cart-details__left">${this.renderProducts(data)}</div>
        <div class="cart-details__right">
          <div class="cart-details__total">
            <div class="cart-details__total-title">Итого:</div>
            <div class="cart-details__total-content">
              <span class="cart-details__total-value">${totalSum}</span> ₽
            </div>
          </div>
          <button class="button">Оформить заказ</button>
          <a class="button" href="#">Продолжить покупки</a>
        </div>`
      : `<div class="cart-details__empty"><a class="button" href="#">За покупками</a></div>`;

    return `
      <h2 class="cart-details__title page-title">Корзина
        <span class="cart-details__products-amount">
          всего товаров: <span>${totalNumber}</span>
        <span>
      </h2>
      <div class="cart-details__content">
        ${content}
      </div>
    `;
  }

  public render(data: AppLoadEventData): string {
    let html = '';
    if (data !== undefined) {
      const { error } = data;
      
      html = !error
        ? this.renderCart(data)
        : `Ошибка загрузки товаров`;
    }

    return super.render((loader: string) => `
      <div class="cart-details">
        <div class="cart-details__container container">
          ${loader !== '' ? loader : html}
        </div>
      </div>
    `);
  }
}