import './news-source-info.css';
import { SourceData } from "@components/sources";
import { View, ViewOptions } from "@views/view";

export class NewsSourceInfoView extends View<SourceData> {
  constructor(options: ViewOptions<SourceData> = {}) {
    super({
      ...options,
      root: '.news__source-info'
    })
  }

  public render(options: ViewOptions<SourceData>): void {
    const { data } = options;
    if (data === undefined || super.render(options)) return;

    const { name, description, url, category, language, country } = data as SourceData;
    this.contentEl?.classList.add('source-info');
    const container = document.createElement('div');
    container.className = 'source-info__container';

    container.innerHTML = `
      <header class="source-info__header">
        <a class="source-info__title" href="${url}">
          ${name}
        </a>
        <div class="source-info__items">
          <span class="source-info__item">
            <span class="source-info__item-title">Category:</span>
            <span class="source-info__item-content">${category}</span>
          </span>
          <span class="source-info__item">
            <span class="source-info__item-title">Lang:</span>
            <span class="source-info__item-content">${language}</span>
          </span>
          <span class="source-info__item">
            <span class="source-info__item-title">Country:</span>
            <span class="source-info__item-content">
              <img class="source-info__flag"
                alt="${country}"
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.toUpperCase()}.svg">
            </span>
          </span>
        </div>
      </header>
      <p class="source-info__description">${description}</p>
    `;

    (this.contentEl as HTMLElement).innerHTML = '';
    this.contentEl?.append(container);
  }
}