import { ComponentHandler } from "@core/component";
import { View, ViewOptions } from "@core/view";
import { Button } from '@components/button';

type CreateCarViewData = {
  clickHandler: ComponentHandler;
  content: string;
}

export class CreateCarView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: `.create-car`,
    });
  }

  public render(data?: CreateCarViewData): string {
    if (data === undefined) return '';
    const { clickHandler, content } = data;
    return super.render(`
      <div class="control-panel__${content.toLowerCase()}-car create-car">
        <input type="text" class="create-car__input" placeholder="Car model">
        <input type="color" class="create-car__color-pick">
        ${this.renderChild('button', Button, {
          handlers: { onClick: clickHandler },
          viewOptions: {
            data: { content, classes: 'create-car__submit button' }
          }
        })}
      </div>
    `)
  }
}