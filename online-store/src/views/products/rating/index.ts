import './rating.scss';
import { View, ViewOptions } from "@core/view";

export class RatingView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.product__rating'
    })
  }

  private getStarStyle(colorStop: number) {
    if (colorStop === 100) return '';
    const colorStopOut = `${colorStop}%`;
    return `style="background: linear-gradient(90deg, #ffa500 ${colorStopOut}, #ffffff ${colorStopOut});"`;
  }

  private renderStars(rating: string) {
    const n = Number.parseFloat(rating);
    const starColorStops = Array(5).fill(0).map((_, i) => {
      if ((i + 1) <= n) return 100;
      const colorStop = Math.trunc((1 - (i + 1 - n)) * 100);
      return colorStop < 0 ? 0 : colorStop;
    });
    return starColorStops
      .map((colorStop) => (`
        <span class="product-rating__star">
          <span class="product-rating__start-inner" ${this.getStarStyle(colorStop)}></span>
        </span>
      `))
      .join('');
  }

  public render(data: { rating: string }): string {
    return super.render(`
      <div class="product__rating product-rating">
        <span class="product-rating__stars">
          ${this.renderStars(data.rating)}
        </span>
        <span class="product-rating__value">${data.rating}</span>
      </div>
    `)
  }
}