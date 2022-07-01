import './reset-btn.css';
import { View, ViewOptions } from '@views/view';

export class ResetBtnView extends View<string> {
  constructor(options: ViewOptions<string> = {}) {
    super({
      ...options,
      root: '.source-filters__container',
    })
  }
  
  public render(): void {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.className = 'button button_reset';
    btn.title = 'Reset';
    btn.innerHTML = `<i class="fa-solid fa-arrow-rotate-right"></i>`;
    this.contentEl?.append(btn);
  }
}