import './alert.scss';
import { View, ViewOptions } from "@core/view";

export class AlertView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.alert',
    })
  }

  public render(data?: { message: string }): string {
    return super.render(`
      <div class="alert">
        <p>${data ? data.message : ''}</p>
      </div>
    `)
  }
}