export const SHUFFLE_ANIMATION_DURATION = 250;

export interface ItemInfo {
  element: Element;
  id: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function extractItemsInfo(
  container: Element,
  getId: (item: Element) => string | null = () => null
): ItemInfo[] {
  return Array.from(container.children).map((item) => {
    const rect = item.getBoundingClientRect()
    return {
      id: getId(item),
      element: item,
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    }
  })
}

export function animateItems(
  oldItemsInfo: ItemInfo[],
  newItemsInfo: ItemInfo[]
): void {
  for (const newItem of newItemsInfo) {
    const oldItem = oldItemsInfo.find(
      (itemInfo) => itemInfo.id === newItem.id
    )
    
    if (oldItem === undefined) continue;

    const translateX = oldItem.x - newItem.x
    const translateY = oldItem.y - newItem.y
    const scaleX = oldItem.width / newItem.width
    const scaleY = oldItem.height / newItem.height

    newItem.element.animate(
      [
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        },
        { transform: 'none' },
      ],
      {
        duration: SHUFFLE_ANIMATION_DURATION,
        easing: 'ease-out',
      }
    )
  }
}