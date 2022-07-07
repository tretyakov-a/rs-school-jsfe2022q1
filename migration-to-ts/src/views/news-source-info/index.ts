import './news-source-info.css';
import { SourceData } from "@components/sources";
import { View, ViewOptions } from "@views/view";

export class NewsSourceInfoView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      root: '.news',
      contentEl: '.news__source-info',
    })
  }

  public render(data: SourceData): void {
    if (data === undefined) return;

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

    super.render(container);
  }
}