import { RenderData, View } from "./view";
import { SpinnerView } from '@views/spinner';

type ComponentData = string | void | HTMLElement;

export type ComponentHandler<T> = (data: T) => void;
export type ComponentHandlers = Record<string, ComponentHandler<string>>

export type ComponentProps<T> = {
  view: View<T>;
  handlers?: ComponentHandlers;
}

export class Component<T> {
  protected components: Record<string, Component<ComponentData>>;
  protected props: ComponentProps<T>;

  constructor(props: ComponentProps<T>) {
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
    this.view.render({ data: (new SpinnerView()).render() });
  }

  public onLoadingEnd(data: RenderData<T>): void {
    this.view.render({ data: '' });
    this.view.render({ data });
  }

  public update(data?: RenderData<T>): void {
    this.view.render({ data });
  }
}