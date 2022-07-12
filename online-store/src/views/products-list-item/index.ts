import './products-list-item.scss';
import { View, ViewOptions } from '@core/view';
import sampleProductImg from '@assets/sample-product.jpg';
import { Product } from '@common/product';
import { AddToCartBtn } from '@components/add-to-cart-btn';

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
    const { product } = data;
    const imgUrl = `https://raw.githubusercontent.com/tretyakov-a/online-store/main/${product.imgs[0]}`;

    return super.render(`
      <li class="products-list__item product">
        <div class="product__img">
          <img
            src="${sampleProductImg}"
            alt="${product.title}">
        </div>
        <div class="product__description">
          <h3 class="product__title">${product.title}</h3>
          <div class="product__buy">
            <div class="product__price">${product.price} ₽</div>
            ${this.renderChild('addToCart', AddToCartBtn, { data })}
          </div>
          <div class="product__info">
            <div class="product__rating product-rating">
              <span class="product-rating__stars">
                <span class="product-rating__star"></span>
                <span class="product-rating__star"></span>
                <span class="product-rating__star"></span>
                <span class="product-rating__star"></span>
                <span class="product-rating__star"></span>
              </span>
              <span class="product-rating__value">${product.rating}</span>
            </div>
            <label class="product__compare checkbox">
              <input type="checkbox" name="product-compare">
              <span class="checkbox__check"></span>
              <span class="checkbox__title">Compare</span>
            </label>
          </div>
        </div>
      </li>
    `);
  }
}