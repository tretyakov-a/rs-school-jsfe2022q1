import { capitalize } from "@common/utils";
import { Button } from "@components/button";
import { ComponentHandler } from "@core/component";
import { View } from "@core/view";

type ButtonOptions = {
  handler: ComponentHandler | null,
  content?: string;
  classes?: string;
}

export function renderButtons(this: View, className: string, buttons: Record<string, ButtonOptions>) {
  return Object.keys(buttons)
    .map((name) => {
      const { handler, content, classes } = buttons[name];
      return this.renderChild(name, Button, {
        handlers: handler !== null ? { onClick: handler } : {},
        viewOptions: {
          root: `.${className}__${name}`,
          data: { content: content || capitalize(name), classes: `${className}__${name} button ${classes || ''}` }
        }
      })
    })
    .join('');
}