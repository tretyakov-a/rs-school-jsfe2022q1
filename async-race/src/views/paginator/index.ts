import './paginator.scss';
import { View, ViewOptions } from '@core/view';
import { ComponentHandler } from '@core/component';
import { renderButtons } from '@views/shared';

type PaginatorViewData = {
  prevHandler: ComponentHandler;
  nextHandler: ComponentHandler;
  pageNumber: number;
  maxPage: number;
  prevClasses: string;
  nextClasses: string;
}

export class PaginatorView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.paginator',
    })
  }
  
  public render(data: PaginatorViewData): string {
    const { prevHandler, nextHandler, pageNumber, maxPage, nextClasses, prevClasses } = data;
    return super.render(`
      <div class="paginator">
        ${renderButtons.call(this, 'paginator', {
          'prev': { handler: prevHandler, classes: prevClasses },
          'page': { handler: () => {}, content: `Page ${pageNumber}/${maxPage}`, classes: 'button_inactive' },
          'next': { handler: nextHandler, classes: nextClasses },
        })}
      </div>
    `);
  }
}