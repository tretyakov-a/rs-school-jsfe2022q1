import { View, ViewOptions } from "@core/view";

export class ButtonView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.button',
    });
  }

  public render(data?: { content: string, classes?: string }): string {
    if (data === undefined) {
      return '';
    }
    return super.render(`
      <button class="${data.classes || ''}">${data.content}</button>
    `);
  }
}