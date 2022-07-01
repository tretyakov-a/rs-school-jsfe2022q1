import { PaginationData } from '@components/news-pagination';
import { View, ViewOptions } from '@views/view';
import './news-pagination.css';

export class NewsPaginationView extends View<PaginationData> {
  constructor(options: ViewOptions<PaginationData> = {}) {
    super({
      ...options,
      root: '.news__pagination',
    })
  }

  public render(options: ViewOptions<PaginationData>): void {
    const { data } = options;
    if (super.render(options)) return;

    const { currentPage, itemsNumber, itemsPerPage } = data as PaginationData;
    const pagesNumber = Math.ceil(itemsNumber / itemsPerPage);

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pagesNumber; i += 1) {
      const btn = document.createElement('div');
      const classes = [
        'pagination__item',
        currentPage === i ? 'pagination__item_active' : '',
      ]
      btn.className = classes.join(' ');
      btn.textContent = `${i + 1}`;
      btn.setAttribute('data-page', `${i}`);
      fragment.append(btn);
    }

    (this.contentEl as HTMLElement).innerHTML = '';
    this.contentEl?.append(fragment);
  }
}