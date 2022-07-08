import { Component, ComponentHandlers } from "@core/component";
import { CheckboxListView } from "@views/checkbox-list";
import { FilterData } from "./filters/filter";

export class CheckboxList extends Component {
  private checkboxes: NodeList;

  constructor(data: FilterData, root: HTMLElement, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new CheckboxListView({
        data, root,
        contentEl: '.filter__content',
      })
    });
    this.checkboxes = this.getRoot().querySelectorAll(`input[name="${data.name}"]`);
    this.checkboxes.forEach((el) => {
      el.addEventListener('change', this.handleChange);
    });
  }


  private handleChange = () => {
    const values = [...this.checkboxes].reduce((acc: string[], el) => {
      return el instanceof HTMLInputElement && el.checked
        ? [ ...acc, el.value ]
        : acc;   
    }, []);
    this.handlers?.onChange(values);
  }
}