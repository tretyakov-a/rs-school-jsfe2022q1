import { Component, ComponentProps } from "@core/component";
import { ProductsSortView } from "@views/products-sort-view";
import { selectFrom } from '@common/utils';
import { EVENT } from '@common/constants';
import { sortData, SORT } from "@common/sorting";

export type ProductsSortViewOptions = {
  options: typeof sortData;
}

export class ProductsSort extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsSortView,
    });

    this.update({ options: sortData });
  }

  private onChange = (e: Event) => {
    const select = e.currentTarget;
    if (select !== null && select instanceof HTMLSelectElement) {
      this.emit(EVENT.CHANGE_SORT, select.value);
    }
  }

  protected update(data?: ProductsSortViewOptions): void {
    super.update(data);

    selectFrom(this.getElement())('select').addEventListener('change', this.onChange);
  }
}