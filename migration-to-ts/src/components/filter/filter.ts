
import { DEFAULT_FILTER_OPTION, FILTER_NAME } from '@common/constants';
import { selectFrom } from '@common/utils';
import { SourceData } from '@components/sources';
import { Component, ComponentProps } from '../component';

export type FilterOptions = [ FILTER_NAME, keyof SourceData ];

export class Filter extends Component<string> {
  protected name: FILTER_NAME;
  protected dataKey: keyof SourceData;
  protected value: string;
  protected inputEl: HTMLInputElement;

  constructor(props: ComponentProps<string>, [ name, dataKey ]: FilterOptions) {
    super(props)
    this.value = DEFAULT_FILTER_OPTION;
    this.name = name;
    this.dataKey = dataKey;
    this.inputEl = selectFrom(this.getRoot())(`[name="${this.name}"]`) as HTMLInputElement;
  }
  
  public static getFilterData = (data: SourceData[], key: keyof SourceData): string[] => {
    return data.reduce((acc: string[], item) => {
      return !acc.includes(item[key])
        ? [...acc, item[key]]
        : acc;
    }, []);
  }

  public resetDefault(): void {
    this.value = '';
    this.inputEl.value = '';
  }

  public check(dataItem: SourceData): boolean {
    return dataItem[this.dataKey] !== undefined;
  }
}
