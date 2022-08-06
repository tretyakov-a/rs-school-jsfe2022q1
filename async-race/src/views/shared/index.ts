import { capitalize } from "@common/utils";
import { Button } from "@components/button";
import { ComponentHandler } from "@core/component";
import { View } from "@core/view";

export function renderButtons(this: View, className: string, buttons: Record<string, [ComponentHandler, string?]>) {
  return Object.keys(buttons)
    .map((name) => {
      const [ handler, content] = buttons[name];
      return this.renderChild(name, Button, {
        handlers: { onClick: handler },
        viewOptions: {
          root: `.${className}__${name}`,
          data: { content: content || capitalize(name), classes: `${className}__${name} button` }
        }
      })
    })
    .join('');
}