import './cart-product.scss';
import { View, ViewOptions } from '@core/view';
import { Product } from '@common/product';
import { BASE_URL } from '@common/constants';
import { loadImage, selectFrom } from '@common/utils';
import imgPlaceholder from '@assets/img-placeholder-quadrocopter.png';

export class CartProductView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.cart-product',
    })
  }

  public render(data: { product: Product, productsAmount: number}): string {
    const { title, price, imgs, id } = data.product;
    const imgUrl = `${BASE_URL}/${imgs[0]}`;

    loadImage(imgUrl)
      .then((src) => {
        const img = selectFrom(this.getRoot())('.cart-product__img img');
        if (img instanceof HTMLImageElement) img.src = src;
      })

    return `
      <li class="cart-details-products__item cart-product">
        <div class="cart-product__img">
          <a href="#product?id=${id}">
            <img
              src="${imgPlaceholder}"
              alt="${title}">
          </a>
        </div>
        <div class="cart-product__content">
          <h3 class="cart-product__title">
            <a href="#product?id=${id}">${title}</a>
          </h3>
          <div class="cart-product__count">
            <button class="button button_icon cart-product__sub-btn">-</button>
            <span class="cart-product__counter">${data.productsAmount}</span>
            <button class="button button_icon cart-product__add-btn">+</button>
          </div>
        </div>
        <div class="cart-product__right">
          <div class="cart-product__price">
            <span class="cart-product__price-value">${data.productsAmount * price}</span> ₽
          </div>
          <button class="button cart-product__delete-btn">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </li>`
  }  
}
