import { Component, ComponentHandlers, ComponentProps } from "@core/component";
import { View } from "@core/view";
import { Filter, FilterData } from "./filter";
import { Range } from "../range";

export class RangeFilter extends Filter {
  protected left: number;
  protected right: number;

  constructor(data: FilterData, root: HTMLElement, handlers: ComponentHandlers = {}) {
    super(data, {
      handlers,
      view: new View()
    });

    this.left = data.min || 0;
    this.right = data.max || 0;
    this.components.range = new Range({
      min: this.left,
      max: this.right,
    }, root, handlers);
  }
}