import { ComponentHandlers } from "@core/component";
import { View } from "@core/view";
import { Filter, FilterData } from "./filter";
import { CheckboxList } from '../checkbox-list';

export class CheckboxFilter extends Filter {
  protected checkedValues: string[];

  constructor(data: FilterData, root: HTMLElement, handlers: ComponentHandlers = {}) {
    super(data, {
      handlers,
      view: new View()
    });

    this.checkedValues = [];
    this.components.checkboxList = new CheckboxList(data, root, handlers);
  }
}