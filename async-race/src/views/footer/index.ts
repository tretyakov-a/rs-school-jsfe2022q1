import './footer.scss';
import { View, ViewOptions } from '@core/view';
import { Component } from '@core/component';
import { RssLogoView } from '@views/rss-logo';

export class FooterView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.footer',
    })
  }
  
  public render(): string {
    return super.render(`
      <div class="footer">
        <div class="footer__container container">
          ${this.renderChild('rssLogo', Component, {
            viewConstructor: RssLogoView
          })}
          <div class="footer__year">
            2022
          </div>
          <a class="footer__github-link" href="https://github.com/tretyakov-a" title="GitHub" target="_blank">
            <i class="fab fa-github"></i>
            tretyakov-a
          </a>
        </div>
      </div>
    `);
  }
}