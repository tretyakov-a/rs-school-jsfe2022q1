import { SourceResponseData } from "controller/loader";
import { Component, ComponentHandler, ComponentHandlers } from "./component";
import { Filter } from "./filter";
import { selectFrom } from '@common/utils';
import { SourcesView } from '@views/sources';

export interface SourceData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

type GetSourceDataFunction = (callback: (data: SourceResponseData) => void) => void;

export class Sources extends Component<SourceData> {
  private sources: SourceData[];
  private getData: GetSourceDataFunction;
  private activeItem: Element | null;

  constructor(getData: GetSourceDataFunction, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new SourcesView(),
    });

    this.sources = [];
    this.activeItem = null;
    this.getData = getData;
    this.getRoot().addEventListener('click', this.onClick);
    this.load();
  }

  public applyFilters(filters: Filter[]) {
    const activeItemId = this.getSourceId(this.activeItem);
    const filtredItems = this.sources.filter((item) => {
      return filters.reduce((acc, filter) => acc && filter.check(item), true);
    });
    super.update(filtredItems);
    if (filtredItems.find(({ id }) => id === activeItemId)) {
      this.setActive(selectFrom(this.getRoot())(`[data-source-id=${activeItemId}]`));
    }
  }

  private onLoad = (data: SourceResponseData): void => {
    this.sources = data.sources ? data.sources : [];
    this.onLoadingEnd(this.sources);
    (this.props.handlers?.onDataLoad as ComponentHandler<SourceData[]>)(this.sources);
  }

  public load(data?: SourceData[]): void {
    if (data !== undefined) {
      return super.update(data);
    }
    this.onLoadingStart();
    this.getData(this.onLoad);
  }

  private getSourceId(el: Element | null): string {
    return el === null ? '' : el.getAttribute('data-source-id') || '';
  }

  private setActive(el: Element): void {
    this.activeItem?.classList.remove('source__item_active')
    this.activeItem = el;
    this.activeItem.classList.add('source__item_active');
  }

  private onClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest('.source__item');
    if (!el) return;

    const sourceId = this.getSourceId(el);
    const activeItemId = this.getSourceId(this.activeItem);
    if (activeItemId !== sourceId) {
      this.setActive(el);
      (this.props.handlers?.onSourceClick as ComponentHandler<string>)(sourceId);
    }
  }
}