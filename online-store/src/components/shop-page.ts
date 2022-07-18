import { Component, ComponentProps } from '@core/component';
import { ShopPageView } from '@views/pages/shop-page';
import { selectFrom } from '@common/utils';
import { EVENT } from '@common/constants';

export class ShopPage extends Component {
  static asideClass = 'shop';
  private leftSideEl: HTMLElement | null;
  private overlayEl: HTMLElement | null;

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: ShopPageView,
    });

    this.leftSideEl = null;
    this.overlayEl = null;

    this.on(EVENT.TOGGLE_MAIN_LEFT, this.handleToogleMainLeft);
  }

  private handleToogleMainLeft = (e: CustomEvent<boolean>) => {
    const showMod = (className: string) => `${className}_show`;
    const hideMod = (className: string) => `${className}_hide`;
    const left = `${ShopPage.asideClass}__left`;
    const overlay = `${ShopPage.asideClass}__overlay`;
    const show = e.detail;
    if (show) {
      this.leftSideEl?.classList.add(showMod(left));
      this.overlayEl?.classList.add(showMod(overlay));
    } else {
      this.leftSideEl?.classList.remove(showMod(left));
      this.overlayEl?.classList.remove(showMod(overlay));
      this.leftSideEl?.classList.add(hideMod(left));
      this.overlayEl?.classList.add(hideMod(overlay));
      setTimeout(() => {
        this.leftSideEl?.classList.remove(hideMod(left));
        this.overlayEl?.classList.remove(hideMod(overlay));
      }, 250);
    }
  }

  protected afterRender(): void {
    super.afterRender();

    this.leftSideEl = selectFrom(this.getRoot())(`.${ShopPage.asideClass}__left`);
    this.overlayEl = selectFrom(this.getRoot())(`.${ShopPage.asideClass}__overlay`);
  }
}
