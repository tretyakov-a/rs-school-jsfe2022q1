
import { useCustom } from '@common/utils';

export class Emmiter extends EventTarget {
  constructor() {
    super()
  }

  public on(event: string, listener: (e: CustomEvent) => void) {
    const customListener = useCustom(listener);
    this.addEventListener(event, customListener);
    return () => {
      this.removeEventListener(event, customListener);
    }
  }

  public emit(event: string, data?: unknown) {
    this.dispatchEvent(new CustomEvent(event, { detail: data }));
  }
}
