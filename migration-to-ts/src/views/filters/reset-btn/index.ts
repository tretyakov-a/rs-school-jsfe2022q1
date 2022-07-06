import './reset-btn.css';
import { View, ViewOptions } from '@views/view';

export class ResetBtnView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      root: '.source-filters__right',
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