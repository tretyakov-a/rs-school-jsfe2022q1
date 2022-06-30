import { SourceResponseData } from "controller/loader";
import { Component, ComponentProps } from "./component";
import { Filter } from "./filter";

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

  constructor(props: ComponentProps<SourceData>, getData: GetSourceDataFunction) {
    super(props);

    this.sources = [];
    this.getData = getData;
    this.getRoot().addEventListener('click', this.onClick);
    this.update();
  }

  public applyFilters(filters: Filter[]) {
    super.update(this.sources.filter((item) => {
      return filters.reduce((acc, filter) => acc && filter.check(item), true);
    }))
  }

  public update(data?: SourceData[]): void {
    if (data !== undefined) {
      return super.update(data);
    }
    this.onLoadingStart();
    this.getData((data) => {
      this.sources = data.sources ? data.sources : [];
      this.onLoadingEnd(this.sources);
      this.props.handlers?.onDataLoad(this.sources);
    });
  }

  private onClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest('.source__item');
    if (!el) return;

    const sourceId = el.getAttribute('data-source-id') || '';
    this.props.handlers?.onSourceClick(sourceId)
  }
}