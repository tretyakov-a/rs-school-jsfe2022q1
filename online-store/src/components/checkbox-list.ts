import { ComponentHandlers, ComponentProps } from "@core/component";
import { CheckboxListView } from "@views/checkbox-list";
import { Filter, FilterData } from "./filters/filter";

export class CheckboxList extends Filter {

  constructor(data: FilterData, root: HTMLElement, handlers: ComponentHandlers = {}) {
    super(data, {
      handlers,
      view: new CheckboxListView({
        data, root,
        contentEl: '.filter__content',
      })
    });
  }

}