import { ComponentProps } from "@core/component";
import { FiltersHeaderBtnView } from "@views/filters/filters-header-btn";
import { Button } from "../button";
import { EVENT } from '@common/constants';
import { ICON_TYPE } from '@views/btn-icon';

export class FiltersHeaderBtn extends Button {
  static showMod = `filters-btn_show`;
  private show: boolean;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: FiltersHeaderBtnView,
    });

    this.show = false;
  }

  protected onClick = (e: Event) => {
    e.stopPropagation();
    this.toogle();
  }

  private toogle() {
    this.show = !this.show;
    const icon = this.getIcon();
    const parent = this.getRoot().parentElement;
    if (this.show) {
      const { top, left, width } = this.getRoot().getBoundingClientRect();
      this.getRoot().classList.add(FiltersHeaderBtn.showMod);
      this.getRoot().style.top = `${top}px`;
      this.getRoot().style.left = `${left}px`;
      parent && (parent.style.paddingLeft = `calc(${width}px + 1rem)`);
      document.body.classList.add('no-y-scroll');
      icon?.update(ICON_TYPE.CROSS);
    } else {
      this.getRoot().classList.remove(FiltersHeaderBtn.showMod);
      icon?.update(ICON_TYPE.FILTERS);
      parent && (parent.style.paddingLeft = `0px`);
      document.body.classList.remove('no-y-scroll');
    }
    this.emit(EVENT.TOGGLE_MAIN_LEFT, this.show);
  }

  private handleDocumentClick = (e: Event) => {
    const el = e.target;
    if (el !== null && el instanceof HTMLElement && el.closest('.shop__left') !== null) {
      return;
    }
    if (this.getRoot().classList.contains(FiltersHeaderBtn.showMod)) {
      this.toogle();
    }
  }

  afterRender(): void {
    super.afterRender();

    document.addEventListener('click', this.handleDocumentClick);
  }
}