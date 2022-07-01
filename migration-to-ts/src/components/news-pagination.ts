import { Component, ComponentHandler, ComponentProps } from '@components/component';
import { selectFrom } from '@common/utils';

export type PaginationData = {
  currentPage: number;
  itemsPerPage: number;
  itemsNumber: number;
}

export class NewsPagination extends Component<PaginationData> {
  private data: PaginationData;
  private activeItem: Element | null;

  constructor(props: ComponentProps<PaginationData>, data: PaginationData) {
    super(props);
    this.data = data;
    this.activeItem = null;

    (this.getRoot()).addEventListener('click', this.onClick);
    this.setActive(
      selectFrom(this.getRoot())(`[data-page="${this.data.currentPage}"]`)
    );
  }

  private getPageNumber(el: Element | null): number {
    return el === null ? 0 : Number(el.getAttribute('data-page'));
  }

  private setActive(el: Element): void {
    this.activeItem?.classList.remove('pagination__item_active')
    this.activeItem = el;
    this.activeItem.classList.add('pagination__item_active');
  }

  private onClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest('.pagination__item');
    if (!el) return;

    const pageNumber = this.getPageNumber(el);
    
    if (this.data.currentPage !== pageNumber) {
      this.data.currentPage = pageNumber;
      this.setActive(el);
      (this.props.handlers?.onPageChange as ComponentHandler<PaginationData>)(this.data);
    }
  }
}