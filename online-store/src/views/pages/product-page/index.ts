import './product-page.scss';
import { View, ViewOptions } from '@core/view';
import { Product, ProductPropSpec } from '@common/product';
import { LoaderView } from '@core/loader-view';
import { capitalize, loadImage, selectFrom } from '@common/utils';
import { BASE_URL } from '@common/constants';
import { AppLoadEventData } from '@components/app';
import { RatingView } from '@views/products/rating';
import { Component } from '@core/component';
import { AddToCartBtn } from '@components/products/add-to-cart-btn';
import imgPlaceholder from '@assets/img-placeholder-quadrocopter.png';

export class ProductPageView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.product-details',
    })
  }
  
  private renderImages(imgSources: string[]): string {
    return imgSources
      .map((src) => {
        const imgUrl = `${BASE_URL}/${src}`;
        return `
          <li class="product-details-slider__item">
            <img src="${imgPlaceholder}">
          </li>`;
      })
      .join('')
  }

  private renderPropSpecs(specs: ProductPropSpec): string {
    const items = Object.keys(specs).map((key) => {
      const { title, value } = specs[key]!;
      return `
        <li class="specs__item">
          <span class="specs__title">${title}</span>
          <span class="specs__value">${value}</span>
        </li>`
    })
    return `
      <ul class="props__specs specs">
        ${items.join('')}
      </ul>`;
  }

  private renderProps({ props }: Product): string {
    const items = Object.keys(props).map((key) => {
      const { title, specs} = props[key]!;
      return `
        <li class="props__item">
          <h4 class="props__title">${title}</h4>
          ${this.renderPropSpecs(specs)}
        </li>`
    })
    return `
      <ul class="props">
        ${items.join('')}
      </ul>`;
  }

  public renderProduct(data: Omit<AppLoadEventData, 'products'> & { product: Product }): string {
    const { product, state: { productInCartIds }, error } = data;
    const { id, title, description, imgs, price, rating, brand, brandImage, year } = product;
    const isInCart = productInCartIds.includes(id);
    const { model, type } = product.props.classification?.specs!;

    const imgUrl = `${BASE_URL}/${imgs[0]}`;
    loadImage(imgUrl)
      .then((src) => {
        const img = selectFrom(this.getRoot())('.product-details-slider img');
        if (img instanceof HTMLImageElement) img.src = src;
      })

    return `
      <h2 class="product-details__title">${capitalize(type?.value!)} ${model?.value}</h2>
      <section class="section product-details__card">
        <div class="product-details__left">
          <div class="product-details-slider">
            <img
              src="${imgPlaceholder}"
              alt="${title}">
          </div>
        </div>
        <div class="product-details__right">
          <div class="product-details__info">
            <div class="product-details__info-row">
              <div class="product-details__info-title">${title}</div>
              <div class="product-details__info-brand">
                <img src="${BASE_URL}/${brandImage}" alt="${brand}">
              </div>
            </div>
            <div class="product-details__info-row">
              ${this.renderChild('productRating', Component, {
                viewConstructor: RatingView,
                viewOptions: {
                  data: { rating }
                },
              })}
            </div>
            <div class="product-details__info-row">
              <div class="product-details__price">${price} ₽</div>
              ${this.renderChild('addToCart', AddToCartBtn, {
                data: { product, isInCart },
                viewOptions: {
                  data: { isInCart }
                }
              })}
            </div>
            <div class="product-details__info-row">
              <section class="section product-details__description" id="description">
                <h3 class="section__header">Описание</h3>
                <p class="section__content">
                  ${description}
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section class="section product-details__characteristics" id="characteristics">
        <h3 class="section__header">Характеристики</h3>
        <p class="section__content">
          ${this.renderProps(product)}
        </p>
      </section>`;
  }


  public render(data: Omit<AppLoadEventData, 'products'> & { product: Product }): string {
    let html = '';
    if (data !== undefined) {
      const { error } = data;

      html = !error
        ? this.renderProduct(data)
        : `Ошибка загрузки товара`;
    }

    return super.render((loader: string) => `
      <div class="product-details">
        <div class="product-details__container container">
          ${loader !== '' ? loader : html}
        </div>
      </div>
    `);
  }
}