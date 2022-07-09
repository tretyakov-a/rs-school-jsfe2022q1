import { Component, ComponentProps } from "@core/component";
import { CheckboxListView } from "@views/checkbox-list";

export type CheckboxListOptions = {
  name: string,
  values: Record<string, number>;
}

export type CheckboxListProps = ComponentProps & {
  componentOptions?: CheckboxListOptions;
}

export class CheckboxList extends Component {
  private checkboxes: NodeList | null;

  constructor(props: CheckboxListProps) {
    super({
      ...props,
      viewConstructor: CheckboxListView,
    });

    this.checkboxes = null;

    const { componentOptions } = props;
    if (!componentOptions) throw new TypeError();

    this.update(componentOptions);
  }

  protected update(data?: CheckboxListOptions): void {
    super.update(data);

    this.checkboxes = this.getRoot().querySelectorAll(`input[name="${data?.name}"]`);
    this.checkboxes.forEach((el) => {
      el.addEventListener('change', this.handleChange);
    });  
  }

  private handleChange = (): void => {
    if (!this.checkboxes) return;
    const values = [...this.checkboxes].reduce((acc: string[], el) => {
      return el instanceof HTMLInputElement && el.checked
        ? [ ...acc, el.value ]
        : acc;   
    }, []);
    this.handlers?.onChange(values);
  }
}