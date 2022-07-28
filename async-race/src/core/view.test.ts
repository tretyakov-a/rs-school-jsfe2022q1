/**
 * @jest-environment jsdom
 */

import { View } from '@core/view';


describe('Test View class', () => {
  let view: View;

  const rootEl = document.createElement('div');
  rootEl.setAttribute('id', 'app');
  const viewEl = document.createElement('div');
  viewEl.className = 'test';
  rootEl.append(viewEl);
  document.body.append(rootEl);

  const component = {
    renderChild(): string {
      return 'test';
    }
  };
  
  const parentComponent = {
    getRoot(): HTMLElement {
      return rootEl;
    }
  };

  beforeEach(() => {
    // @ts-ignore
    view = new View({ component, root: '.test' });
  });
  
  test('Correctly creates class instance', () => {
    expect(view).toBeDefined();
    expect(view).toBeInstanceOf(View);
    expect(view.getRoot).toBeDefined();
    expect(view.afterRender).toBeDefined();
    expect(view.render).toBeDefined();
  });

  test('getRoot works properly', () => {
    // @ts-ignore
    view.afterRender(parentComponent, -1);

    expect(view.getRoot()).toBe(viewEl);
    // @ts-ignore
    const viewWithNullRoot = new View({ component });
    // @ts-ignore
    viewWithNullRoot.afterRender(parentComponent, -1);
    expect(() => {
      viewWithNullRoot.getRoot()
    }).toThrowError(TypeError);
  });

  test('render work properly', () => {
    expect(view.render('test')).toBe('test');
    expect(view.render()).toBe('');
    expect(view.render({})).toBe('');
  });

});
