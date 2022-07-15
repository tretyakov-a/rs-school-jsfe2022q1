import { Component, ComponentProps } from "@core/component";
import { ProductsSortView } from "@views/products-sort";
import { selectFrom } from '@common/utils';
import { EVENT } from '@common/constants';
import { sortData } from "@common/sorting";
import { AppLoadEventData } from "../app";

export type ProductsSortViewOptions = {
  options: typeof sortData;
}

export class ProductsSort extends Component {
  private inputEl: HTMLSelectElement | null;
  
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ProductsSortView,
    });
    this.inputEl = null;
    
    this.on(EVENT.APP_LOAD, this.handleAppLoad);
  }
  
  private handleAppLoad = ({ detail: { state }}: CustomEvent<AppLoadEventData>) => {
    if (this.inputEl) {
      this.inputEl.value = state.sort;
    }
  }

  private onChange = () => {
    if (this.inputEl) {
      this.emit(EVENT.CHANGE_SORT, this.inputEl.value);
    }
  }

  protected afterRender() {
    super.afterRender();
    const el = selectFrom(this.getRoot())('select');
    if (el instanceof HTMLSelectElement) {
      this.inputEl = el;
      this.inputEl.addEventListener('change', this.onChange);
    }

  }
}