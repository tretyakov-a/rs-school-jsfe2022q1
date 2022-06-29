import { DrawData, View } from "@views/view";
import { SpinnerView } from '@views/spinner';


export class Component<T> extends EventTarget {
  protected view: View<T>;
  protected components: Component<T>[];

  constructor(view: View<T>) {
    super();

    this.components = [];
    this.view = view;
  }

  protected getRoot(): HTMLElement {
    return this.view.getRoot() as HTMLElement;
  }

  public onLoadingStart(): void {
    this.update((new SpinnerView()).render());
  }

  public onLoadingEnd(data: DrawData<T>): void {
    this.update(data);
  }

  public update(data: DrawData<T>): void {
    this.view.render({ data });
  }
}