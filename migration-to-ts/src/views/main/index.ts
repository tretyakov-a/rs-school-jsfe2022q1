import './main.css';
import { View } from "../view";

export class MainView extends View<void> {
  constructor() {
    super({
      root: '#app',
    })
  }

  render(): void {
    const main = document.createElement('main');
    main.innerHTML = `
      <main>
        <div class="sources buttons">
          <div class="sources__wrapper">
            <div class="sources__container"></div>
          </div>
        </div>
        <div class="news">
          <div class="news__container"></div>
          <div class="news__pagination pagination"></div>
        </div>
      </main>
    `;
    this.contentEl?.append(main);
  }
}
