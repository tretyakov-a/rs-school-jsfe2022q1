import './garage-page.scss';
import { ViewOptions } from '@core/view';
import { LoaderView } from '@core/loader-view';
import { AppLoadEventData } from '@components/app';

export class GaragePageView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.garage',
    })
  }

  public render(data: AppLoadEventData): string {
    let html = '';
    if (data !== undefined) {
      const { error } = data;

      html = !error
        ? `<p>Garage page</p>`
        : `Ошибка загрузки`;
    }

    return super.render((loader: string) => `
      <div class="garage">
        <div class="garage__container container">
          ${loader !== '' ? loader : html}
        </div>
      </div>
    `);
  }
}