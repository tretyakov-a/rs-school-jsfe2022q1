import './search-filter.scss';
import { View, ViewOptions } from "@core/view";

export type SearchFilterViewOptions = {
  inputName: string;
  title: string;
  value: string;
}

export class SearchFilterView extends View {

  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.search',
    })
  }

  public render(data: SearchFilterViewOptions): string {
    const { inputName, value, title } = data;

    return super.render(`
      <div class="search">
        <input class="search__input text"
          type="text"
          autocomplete="off"
          name="${inputName}"
          value="${value}"
          placeholder="${title}">
        <button class="search__clear">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <button class="search__submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    `);
  }
}