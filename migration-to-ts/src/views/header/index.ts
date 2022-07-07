import './header.css';
import { View } from "../view";

export class HeaderView extends View {
  constructor() {
    super({
      root: '#app',
    })
  }

  render(): void {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
      <h1>News Portal</h1>
      <form class="source-filters">
        <div class="source-filters__container"></div>
      </form>
    `;
    super.render(header);
  }
}
