import { Component, ComponentHandler, ComponentHandlers } from '@components/component';
import { selectFrom } from '@common/utils';
import { NewsPaginationView } from '@views/news-pagination';

export type PaginationData = {
  currentPage: number;
  itemsPerPage: number;
  itemsNumber: number;
}

export class NewsPagination extends Component {
  private data?: PaginationData;
  private activeItem: Element | null;

  constructor(handlers: ComponentHandlers = {}, data?: PaginationData) {
    super({
      handlers,
      view: new NewsPaginationView({ data })
    });
    this.data = data;
    this.activeItem = null;

    (this.getRoot()).addEventListener('click', this.onClick);
  }

  public getPaginationData(): PaginationData | undefined {
    return this.data;
  }

  private getPageNumber(el: Element | null): number {
    return el === null ? 0 : Number(el.getAttribute('data-page'));
  }

  private setActive(el: Element | null): void {
    this.activeItem?.classList.remove('pagination__item_active')
    this.activeItem = el;
    this.activeItem?.classList.add('pagination__item_active');
  }

  public update(data: PaginationData): void {
    super.update(data);
    if (typeof data === 'string') return;

    this.data = data;
    this.setActive(
      selectFrom(this.getRoot())(`[data-page="${this.data.currentPage}"]`)
    );
  }

  private onClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest('.pagination__item');
    if (!el || !this.data) return;
    const pageNumber = this.getPageNumber(el);
    
    if (this.data.currentPage !== pageNumber) {
      this.data.currentPage = pageNumber;
      this.update(this.data);
      window.scrollTo(0, this.getRoot().offsetTop);
      (this.props.handlers?.onPageChange as ComponentHandler)(this.data);
    }
  }
}