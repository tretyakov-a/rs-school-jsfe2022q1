import { SourcesView } from "@views/sources";
import { Component } from "./component";

export interface SourceData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export type SourcesClickEvent = CustomEvent<{ sourceId: string }>;

export class Sources extends Component<SourceData> {
  constructor(selector: string, data?: SourceData[]) {
    super({
      view: new SourcesView({
        data,
        root: selector,
        contentEl: '.sources__container'
      }),
    });

    this.getRoot().addEventListener('click', this.onClick);
  }

  private onClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest('.source__item');
    if (!el) return;

    const sourceId = el.getAttribute('data-source-id') || '';

    this.dispatchEvent(new CustomEvent('click', { detail: { sourceId } }));
  }

}