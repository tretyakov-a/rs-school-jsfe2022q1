import './winners-page.scss';
import { ViewOptions } from '@core/view';
import { AppLoadEventData } from '@components/app';
import { LoaderView } from '@core/loader-view';

export class WinnersPageView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.winners',
    })
  }

  public render(data: AppLoadEventData): string {
    let html = '';
    if (data !== undefined) {
      const { error } = data;
      
      html = !error
        ? `<p>Winners page</p>`
        : `Ошибка загрузки товаров`;
    }

    return super.render((loader: string) => `
      <div class="winners">
        <div class="winners__container container">
          ${loader !== '' ? loader : html}
        </div>
      </div>
    `);
  }
}