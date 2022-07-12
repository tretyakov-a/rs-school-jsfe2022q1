import { Component, ComponentProps } from "@core/component";
import { ProductsSortView } from "@views/products-sort";
import { selectFrom } from '@common/utils';
import { EVENT } from '@common/constants';
import { sortData } from "@common/sorting";

export type ProductsSortViewOptions = {
  options: typeof sortData;
}

export class ProductsSort extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsSortView,
    });
  }

  private onChange = (e: Event) => {
    const select = e.currentTarget;
    if (select !== null && select instanceof HTMLSelectElement) {
      this.emit(EVENT.CHANGE_SORT, select.value);
    }
  }

  protected render(): string {
    return super.render({ options: sortData });
  }

  protected afterRender() {
    super.afterRender();
    selectFrom(this.getRoot())('select').addEventListener('change', this.onChange);
  }
}