/**
 * @jest-environment jsdom
 */

import { ActiveRoute } from './active-route';

describe('Test ActiveRoute class', () => {

  test('getPath method works properly', () => {
    expect(ActiveRoute.getPath).toBeDefined();

    window.location.hash = '#product?id=abc1232',
    expect(ActiveRoute.getPath()).toBe('#product');
    
    window.location.hash = '#cart',
    expect(ActiveRoute.getPath()).toBe('#cart');

    window.location.hash = '#',
    expect(ActiveRoute.getPath()).toBe('');
  })

  test('getQueryParams method works properly', () => {
    expect(ActiveRoute.getQueryParams).toBeDefined();

    window.location.hash = '#product?id=abc1232',
    expect(ActiveRoute.getQueryParams()).toEqual({ id: 'abc1232' });

    window.location.hash = '#product?id=abc1232&test=42',
    expect(ActiveRoute.getQueryParams()).toEqual({ id: 'abc1232', test: '42' });

    window.location.hash = '#',
    expect(ActiveRoute.getQueryParams()).toEqual({});
  })
})