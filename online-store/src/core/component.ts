import { View } from "@core/view";
import { SpinnerView } from '@views/spinner';

export type ComponentHandler = <T>(data?: T) => void;
export type ComponentHandlers = Record<string, ComponentHandler>

export type ComponentProps = {
  view: View;
  handlers?: ComponentHandlers;
}

export class Component {
  protected components: Record<string, Component | Component[]>;
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

  protected getElement(): HTMLElement {
    return this.view.getElement() as HTMLElement;
  }

  protected onLoadingStart(): void {
    this.view.clear();
    this.components.spinner = new Component({
      view: new SpinnerView({ root: this.getContentEl() })
    })
  }

  protected onLoadingEnd(data?: unknown): void {
    this.view.clear();
    if (this.components.spinner) {
      delete this.components.spinner;
    }
    this.view.render(data);
  }

  protected clear(): void {
    this.view.clear();
  }

  protected update(data?: unknown): void {
    this.view.render(data);
  }
}