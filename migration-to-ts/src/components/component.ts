import { View } from "@views/view";
import { SpinnerView } from '@views/spinner';

export type ComponentHandler = <T>(data: T) => void;
export type ComponentHandlers = Record<string, ComponentHandler>

export type ComponentProps = {
  view: View;
  handlers?: ComponentHandlers;
}

export class Component {
  protected components: Record<string, Component>;
  protected props: ComponentProps;

  constructor(props: ComponentProps) {
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

  public getElement(): HTMLElement {
    return this.view.getElement() as HTMLElement;
  }

  public onLoadingStart(): void {
    this.view.clear();
    this.components.spinner = new Component({
      view: new SpinnerView({ root: this.getContentEl() })
    })
  }

  public onLoadingEnd(data?: unknown): void {
    this.view.clear();
    if (this.components.spinner) {
      delete this.components.spinner;
    }
    this.view.render(data);
  }

  public update(data?: unknown): void {
    this.view.render(data);
  }
}