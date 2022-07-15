import { Component, ComponentProps } from '@core/component';
import { animateItems, ItemInfo, extractItemsInfo } from '@common/shuffle';

export class AnimatedProductsList extends Component {
  private oldItemsInfo: ItemInfo[];
  protected animate: boolean;

  constructor(props: ComponentProps) {
    super(props);

    this.oldItemsInfo = [];
    this.animate = true;
  }

  private getListItemsInfo(): ItemInfo[]  {
    const container = this.getRoot().querySelector('.products-list');
    if (container !== null) {
      return extractItemsInfo(
        container, 
        (item) => item.getAttribute('data-product-id')
      );
    }
    return [];
  }

  protected update(data?: unknown): void {
    this.oldItemsInfo = this.getListItemsInfo();

    super.update(data);
  }

  protected afterRender(): void {
    super.afterRender();
    
    const newItemsInfo = this.getListItemsInfo();

    if (this.oldItemsInfo.length !== 0 && newItemsInfo.length !== 0) {
      this.animate && animateItems(this.oldItemsInfo, newItemsInfo);
    }
  }
}
