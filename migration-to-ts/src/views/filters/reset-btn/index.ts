import './reset-btn.css';
import { View } from '@views/view';

export class ResetBtnView extends View<string> {
  public render(): void {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.className = 'button button_reset';
    btn.innerHTML = `<i class="fa-solid fa-arrow-rotate-right"></i>`;
    this.contentEl?.append(btn);
  }
}