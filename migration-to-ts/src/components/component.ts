import { DrawData, View } from "@views/view";
import { SpinnerView } from '@views/spinner';
import { SourceData } from '@components/sources';
import { NewsData } from "./news";

export type ComponentProps<T> = {
  view: View<T>,
  handlers?: Record<string, Function>
}

export class Component<T> extends EventTarget {
  protected components: Record<string, Component<SourceData | NewsData | string | void>>;
  protected props: ComponentProps<T>;

  constructor(props: ComponentProps<T>) {
    super();

    this.components = {};
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
    this.view.render({ data: (new SpinnerView()).render()});
  }

  public onLoadingEnd(data: DrawData<T>): void {
    this.view.render({ data: '' });
    this.view.render({ data });
  }

  public update(data?: DrawData<T>): void {
    this.view.render({ data });
  }
}