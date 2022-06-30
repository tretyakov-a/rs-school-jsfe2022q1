import { DrawData, View } from "@views/view";
import { SpinnerView } from '@views/spinner';

export type ComponentProps<T> = {
  view: View<T>,
  handlers?: Record<string, () => void>
}

export class Component<T> extends EventTarget {
  protected components: Component<T>[];
  protected props: ComponentProps<T>;

  constructor(props: ComponentProps<T>) {
    super();

    this.components = [];
    this.props = props;
  }

  protected get view() {
    return this.props.view;
  }

  protected get handlers() {
    return this.props.handlers;
  }

  protected getContentEl(): HTMLElement {
    return this.view.getContentEl() as HTMLElement;
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