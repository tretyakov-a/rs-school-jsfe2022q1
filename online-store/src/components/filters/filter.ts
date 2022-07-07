import { Component, ComponentProps } from "@core/component";

export type FilterData = {
  name: string;
  title: string;
  values?: Record<string, number>;
  min?: number;
  max?: number;
}

export class Filter extends Component<FilterData> {
  protected name: string;
  protected title: string;

  constructor(data: FilterData, props: ComponentProps<FilterData>) {
    super(props);
    this.name = data.name;
    this.title = data.title;
  }
}