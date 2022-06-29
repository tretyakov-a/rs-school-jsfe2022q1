
import { DEFAULT_FILTER_OPTION, FILTER_NAME } from '@common/constants';
import { SourceData } from '@components/sources';
import { View } from '@views/view';
import { Component } from '../component';

export type FilterOptions = [ FILTER_NAME, keyof SourceData ];

export class Filter extends Component<string | void> {
  protected name: FILTER_NAME;
  protected dataKey: keyof SourceData;
  protected value: string;

  constructor([ name, dataKey ]: FilterOptions, view: View<string | void>) {
    super(view)
    this.value = DEFAULT_FILTER_OPTION;
    this.name = name;
    this.dataKey = dataKey;
  }
  
  public static getFilterData = (data: SourceData[], key: keyof SourceData): string[] => {
    return data.reduce((acc: string[], item) => {
      return !acc.includes(item[key])
        ? [...acc, item[key]]
        : acc;
    }, []);
  }

  public check(dataItem: SourceData): boolean {
    return dataItem[this.dataKey] !== undefined;
  }
}
