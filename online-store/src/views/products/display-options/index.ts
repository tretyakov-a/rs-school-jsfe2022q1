import './display-options.scss';
import { View, ViewOptions } from '@core/view';
import { DisplayOptionsViewData } from '@components/products/display-options';
import { DISPLAY_OPTION, DISPLAY_OPTION_DEFAULT } from '@common/constants';

const icons = {
  [DISPLAY_OPTION.LIST]: `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 7V11H22V7H10ZM10 21H22V17H10V21ZM10 16H22V12H10V16ZM5 11H9V7H5V11ZM5 21H9V17H5V21ZM5 16H9V12H5V16Z"/>
    </svg>   
  `,
  [DISPLAY_OPTION.GRID]: `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13H13V5H5V13ZM5 23H13V15H5V23ZM15 23H23V15H15V23ZM15 5V13H23V5"/>
    </svg>
  `,
}

export class DisplayOptionsView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.products__display-options',
    })
  }
  
  private renderButtons({ inputName, values }: DisplayOptionsViewData) {
    return values
      .map((value) => (
        `<label class="radio-group__item radio">
          <input type="radio" name="${inputName}" value="${value}" checked="${value === DISPLAY_OPTION_DEFAULT}">
          <div class="radio__button">
            ${icons[value]}        
          </div>
        </label>`
      ))
      .join('');
  }

  public render(data: DisplayOptionsViewData): string {
    return super.render(`
      <div class="products__display-options">
        <div class="radio-group">
          <form class="radio-group__form">
            ${this.renderButtons(data)}
          </form>
        </div>
      </div>
    `);
  }  
}