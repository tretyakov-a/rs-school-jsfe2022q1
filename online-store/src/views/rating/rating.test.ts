import { Component } from '@core/component';
import { Emmiter } from '@core/emmiter';
import { RatingView } from '.';

const noWhiteSpace = (str: string) => str.replace(/\s+/g, '');

const testComponent = new Component({
  emmiter: new Emmiter()
});

const stop = (value: number) => ` style="background: linear-gradient(90deg, #ffa500 ${value}%, #ffffff ${value}%);"`;
const stars = (...values: number[]) => values
  .map((value) => `
    <span class="product-rating__star">
      <span class="product-rating__start-inner"${value === 100 ? '' : stop(value) }></span>
    </span>`
  )
  .join('');

const expectedHtml = (value: number, ...starStops: number[]) => noWhiteSpace(`
  <div class="product__rating product-rating">
    <span class="product-rating__stars">
      ${stars(...starStops)}
    </span>
    <span class="product-rating__value">${value}</span>
  </div>`);

describe('Test RatingView', () => {
  test('Renders correct html', () => {
    const view = new RatingView({
      component: testComponent
    });

    expect(
      noWhiteSpace(view.render({ rating: '4' }))
    ).toBe(expectedHtml(4, 100, 100, 100, 100, 0));

    expect(
      noWhiteSpace(view.render({ rating: '2.7' }))
    ).toBe(expectedHtml(2.7, 100, 100, 70, 0, 0));

    expect(
      noWhiteSpace(view.render({ rating: '0' }))
    ).toBe(expectedHtml(0, 0, 0, 0, 0, 0));

    expect(
      noWhiteSpace(view.render({ rating: '5' }))
    ).toBe(expectedHtml(5, 100, 100, 100, 100, 100));
  })
})