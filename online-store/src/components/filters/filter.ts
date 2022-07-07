import { Component, ComponentProps } from "@core/component";
import { FILTER_NAME } from '@common/constants';

export type FilterData = {
  name: FILTER_NAME;
  title: string;
  values?: Record<string, number>;
  min?: number;
  max?: number;
}

export class Filter extends Component {
  protected name: string;
  protected title: string;

  constructor(data: FilterData, props: ComponentProps) {
    super(props);
    this.name = data.name;
    this.title = data.title;
  }
}