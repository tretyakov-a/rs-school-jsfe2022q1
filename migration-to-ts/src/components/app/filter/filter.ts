import { SourceData } from '@view/sources/sources';
import { DEFAULT_FILTER_OPTION, FILTER_NAME } from '@common/constants';
import { View } from '@view/view';

export type FilterOptions = [ FILTER_NAME, keyof SourceData ];

export class Filter<T> {
  protected name: FILTER_NAME;
  protected dataKey: keyof SourceData;
  protected value: string;
  protected view: View<T>;

  public static getFilterData = (data: SourceData[], key: keyof SourceData): string[] => {
    return data.reduce((acc: string[], item) => {
      return !acc.includes(item[key])
        ? [...acc, item[key]]
        : acc;
    }, []);
  }

  constructor([ name, dataKey ]: FilterOptions, view: View<T>) {
    this.value = DEFAULT_FILTER_OPTION;
    this.name = name;
    this.view = view;
    this.dataKey = dataKey;
  }

  public check(dataItem: SourceData): boolean {
    return dataItem[this.dataKey] !== undefined;
  }
}
