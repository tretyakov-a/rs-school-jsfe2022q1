/**
 * @jest-environment jsdom
 */

import { extractItemsInfo, ItemInfo, isSameInfo, animateItems } from './shuffle';

// @ts-ignore
Element.animate = jest.fn(() => {});

const itemInfo = (
  id: string | null,
  element: Element,
  x: number,
  y: number,
  width: number,
  height: number
): ItemInfo => ({
  id, element, x, y, width, height, 
});

describe('Shuffle module functions', () => {
  let ul: Element;
  const getId = (el: Element) => el.getAttribute('data-id');

  const addLiEl = (id: string): Element => {
    const li = document.createElement('li');
    li.setAttribute('data-id', id);
    ul.append(li);
    return li;
  }

  beforeEach(() => {
    ul = document.createElement('ul');
  });

  test('extractItemsInfo works properly', () => {
    const expected: ItemInfo = itemInfo('a', addLiEl('a'), 0, 0, 0, 0);

    const info = extractItemsInfo(ul, getId);
    expect(Array.isArray(info)).toBe(true);
    expect(info[0]).toEqual(expected);

    const infoWithDefultGetId = extractItemsInfo(ul);
    expect(infoWithDefultGetId[0].id).toBeNull();

    ul.innerHTML = '';
    const infoEmpty = extractItemsInfo(ul, getId);
    expect(infoEmpty).toEqual([]);
  });

  test('isSameInfo works properly', () => {
    const a: ItemInfo = itemInfo('a', addLiEl('a'), 0, 0, 0, 0);
    const b: ItemInfo = itemInfo('b', addLiEl('b'), 1, 0, 0, 0);

    expect(isSameInfo(a, a)).toBe(true);
    expect(isSameInfo(a, b)).toBe(false);
  });

  test('animateItems works properly', () => {
    const a = addLiEl('a');
    const b = addLiEl('b');
    const c = addLiEl('c');
    // @ts-ignore
    a.animate = jest.fn(() => {});
    // @ts-ignore
    b.animate = jest.fn(() => {});
    // @ts-ignore
    c.animate = jest.fn(() => {});

    const oldItems: ItemInfo[] = [
      itemInfo('a', a, 0, 0, 0, 0),
      itemInfo('b', b, 0, 0, 0, 0),
    ];

    let newItems: ItemInfo[] = [
      itemInfo('a', a, 1, 1, 1, 1),
      itemInfo('b', b, 1, 1, 1, 1),
      itemInfo('c', c, 1, 1, 1, 1),
    ];

    animateItems(oldItems, newItems);

    expect(a.animate).toBeCalled();
    expect(b.animate).toBeCalled();
    expect(c.animate).not.toBeCalled();

    // @ts-ignore
    a.animate.mockClear();
    newItems = [
      itemInfo('a', a, 0, 0, 0, 0),
    ];
    animateItems(oldItems, newItems);
    expect(a.animate).not.toBeCalled();
  });
});
