import { propPickers, Product, PropPicker, PROP } from "@common/product";

export enum SORT {
  TITLE_ASC = 'titleAsc',
  TITLE_DESC = 'titleDesc',
  PRICE_ASC = 'priceAsc',
  PRICE_DESC = 'priceDesc',
  RATING_ASC = 'ratingAsc',
  RATING_DESC = 'ratingDesc',
}

type Dir = 'asc' | 'desc';

const more = (dir: Dir) => dir === 'asc' ? 1 : -1;
const less = (dir: Dir) => dir === 'asc' ? -1 : 1;

const getSortingFn = (getProp: PropPicker) => (dir: Dir) => (items: Product[]) => {
  items.sort((productA, productB) => {
    const a = getProp(productA);
    const b = getProp(productB);
    if (a !== undefined && b !== undefined) {
      if (a > b) return more(dir);
      if (a < b) return less(dir);
    } else {
      if (a !== undefined && b === undefined) more(dir);
      if (a == undefined && b !== undefined) less(dir);
    }

    return 0;
  })
}

const sortByTitle = getSortingFn(propPickers[PROP.TITLE]);
const sortByPrice = getSortingFn(propPickers[PROP.PRICE]);
const sortByRating = getSortingFn(propPickers[PROP.RATING]);

export type SortingFunction = (items: Product[]) => void;

export const sortData: Record<SORT, [string, SortingFunction]> = {
  [SORT.TITLE_ASC]: ['По имени (А-Я)', sortByTitle('asc')],
  [SORT.TITLE_DESC]: ['По имени (Я-А)', sortByTitle('desc')],
  [SORT.PRICE_ASC]: ['По возрастанию цены', sortByPrice('asc')],
  [SORT.PRICE_DESC]: ['По убыванию цены', sortByPrice('desc')],
  [SORT.RATING_ASC]: ['По возрастанию рейтинга', sortByRating('asc')],
  [SORT.RATING_DESC]: ['По убыванию рейтинга', sortByRating('desc')],
}