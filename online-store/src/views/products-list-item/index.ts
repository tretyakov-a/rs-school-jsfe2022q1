import './products-list-item.scss';
import { View, ViewOptions } from '@core/view';
import sampleProductImg from '@assets/sample-product.jpg';
import imgPlaceholder from '@assets/img-placeholder-quadrocopter.png';
import { Product } from '@common/product';
import { AddToCartBtn } from '@components/products/add-to-cart-btn';
import { Component } from '@core/component';
import { RatingView } from '@views/rating';
import { BASE_URL } from '@common/constants';
import { loadImage, selectFrom } from '@common/utils';

export type ProductViewOptions = {
  product: Product,
  isInCart: boolean,
}

export class ProductsListItemView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.products-list__item',
    })
  }
  
  public render(data: ProductViewOptions): string {
    const { product: { title, price, rating, imgs, id } } = data;
    const imgUrl = `${BASE_URL}/${imgs[0]}`;
    loadImage(imgUrl)
      .then((src) => {
        const img = selectFrom(this.getRoot())('.product__img img');
        if (img instanceof HTMLImageElement) img.src = src;
      })
    return super.render(`
      <li class="products-list__item product" data-product-id="${id}">
        <div class="product__img">
          <img
            src="${imgPlaceholder}"
            alt="${title}">
        </div>
        <div class="product__description">
          <h3 class="product__title">${title}</h3>
          <p class="product__extra">
            ${data.product.props.additionalInfo?.specs.equipment?.value}
            ${data.product.props.additionalInfo?.specs.extra?.value}
          </p>
          <div class="product__buy">
            <div class="product__price">${price} ₽</div>
            ${this.renderChild('addToCart', AddToCartBtn, { data })}
          </div>
          <div class="product__info">
            ${this.renderChild('productRating', Component, {
              viewConstructor: RatingView,
              data: { rating }
            })}
            <!--
            <label class="product__compare checkbox">
              <input type="checkbox" name="product-compare">
              <span class="checkbox__check"></span>
              <span class="checkbox__title">Compare</span>
            </label>
            -->
          </div>
        </div>
      </li>
    `);
  }
}