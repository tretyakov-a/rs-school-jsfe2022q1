import { Component, ComponentProps } from "@core/component";
import { CheckboxListView } from "@views/checkbox-list";

export type CheckboxListViewOptions = {
  inputName: string,
  values: Record<string, number>;
}

export type CheckboxListProps = ComponentProps & {
  data?: CheckboxListViewOptions;
}

export class CheckboxList extends Component {
  private inputName: string;
  private values: Record<string, number>;
  private checkboxes: NodeList | null;

  constructor(props: CheckboxListProps) {
    super({
      ...props,
      viewConstructor: CheckboxListView,
    });

    const { data } = props;
    if (!data) throw new TypeError();

    this.inputName = data.inputName;
    this.values = data.values;
    this.checkboxes = null;
  }

  protected render(): string {
    const { inputName, values } = this;

    return super.render({ inputName, values });
  }

  afterRender() {
    super.afterRender();
    
    this.checkboxes = this.getRoot().querySelectorAll(`input[name="${this.inputName}"]`);
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