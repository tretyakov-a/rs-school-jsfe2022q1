import { RANGE_SIZE } from '@common/constants';
import { PaginationData } from '@components/news-pagination';
import { View, ViewOptions } from '@views/view';
import './news-pagination.css';

export class NewsPaginationView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      root: '.news',
      contentEl: '.news__pagination',
    });
  }

  private renderBtn(isActive: (page?: number) => boolean) {
    return (range: number[]): DocumentFragment => {
      const fragment = document.createDocumentFragment();
      range.forEach((item) => {
        const btn = document.createElement('div');
        const classes = [
          'pagination__item',
          isActive(item) ? 'pagination__item_active' : '',
        ]
        btn.className = classes.join(' ');
        btn.textContent = `${item + 1}`;
        btn.setAttribute('data-page', `${item}`);
        fragment.append(btn);
      });
      return fragment;
    }
  }

  private renderDots(): HTMLElement {
    const dots = document.createElement('div');
    dots.className = 'pagination__item pagination__item_dots';
    dots.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
    return dots;
  }

  private getRange(n: number, size: number, max: number) {
    if (size % 2 !== 1) return [];
    const start = n - Math.trunc(size / 2);
    const arr = Array
      .from({ length: size }, (_, i) => i + start)
      .filter((item) => item >= 0 && item < max);
    return arr;
  }

  public render(data: PaginationData): void {
    super.render(data);
    if (data === undefined) return;

    const { currentPage, itemsNumber, itemsPerPage } = data as PaginationData;
    if (itemsNumber === 0) return;
    
    const checkPage = (curr: number) => (page?: number | string) => curr === page;
    const isActive = checkPage(currentPage);

    const renderBtn = this.renderBtn(isActive);

    const pagesNumber = Math.ceil(itemsNumber / itemsPerPage);
    const range = this.getRange(currentPage, RANGE_SIZE, pagesNumber);

    const first = !range.includes(0) ? renderBtn([0]) : '';
    const last = !range.includes(pagesNumber - 1) ? renderBtn([pagesNumber - 1]) : '';
    const firstDots = range[0] > 1 ? this.renderDots() : '';
    const lastDots = range[range.length - 1] < pagesNumber - RANGE_SIZE / 2
      ? this.renderDots() : '';

    const fragment = document.createDocumentFragment();
    fragment.append(first, firstDots, renderBtn(range), lastDots, last);
    super.render(fragment);
  }
}