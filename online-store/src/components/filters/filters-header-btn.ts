import { ComponentProps } from "@core/component";
import { FiltersHeaderBtnView } from "@views/filters/filters-header-btn";
import { Button } from "../button";
import { EVENT } from '@common/constants';
import { ICON_TYPE } from '@views/btn-icon';

export class FiltersHeaderBtn extends Button {
  private show: boolean;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: FiltersHeaderBtnView,
    });

    this.show = false;
  }

  protected onClick = async () => {
    const showMod = `filters-btn_show`;
    this.show = !this.show;

    const icon = this.getIcon();
    const parent = this.getRoot().parentElement;
    if (this.show) {
      const { top, left, width } = this.getRoot().getBoundingClientRect();
      this.getRoot().classList.add(showMod);
      this.getRoot().style.top = `${top}px`;
      this.getRoot().style.left = `${left}px`;
      parent && (parent.style.paddingLeft = `calc(${width}px + 1rem)`);
      icon?.update(ICON_TYPE.CROSS);
    } else {
      this.getRoot().classList.remove(showMod);
      icon?.update(ICON_TYPE.FILTERS);
      parent && (parent.style.paddingLeft = `0px`);
    }

    this.emit(EVENT.TOGGLE_MAIN_LEFT, this.show);
  }
}