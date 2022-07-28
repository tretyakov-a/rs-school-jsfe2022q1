import { ActiveRoute } from '@common/active-route';
import { EVENT } from '@common/constants';
import { RenderChildOptions, Component, ComponentProps } from '@core/component';
import { PageNotFoundView } from '@views/pages/page-not-found';

type Routes = Record<string, RenderChildOptions>;

type RouterProps = ComponentProps & {
  data: {
    routes: Routes;
  }
}

export class Router extends Component {
  private routes: Routes;

  constructor(props: RouterProps) {
    super(props);

    this.routes = props.data.routes;

    window.addEventListener('hashchange', this.handlePageChange);
  }

  private getRouteData(): RenderChildOptions | string {
    let path = ActiveRoute.getPath();
    if (path === '') path += '#';

    if (path === '#not-found' || this.routes[path] === undefined) {
      return ['notFoundPage', Component, {
        viewConstructor: PageNotFoundView
      }];
    }

    return this.routes[path];
  }

  private handlePageChange = () => {
    const pageData = this.getRouteData();
    window.scrollTo({ top: 0 });
    this.update(pageData);
    this.emit(EVENT.CHANGE_PAGE);
  }

  protected render(data?: string | RenderChildOptions): string {
    super.render();

    let pageData = data;
    if (pageData === undefined) {
      pageData = this.getRouteData();
    };
    if (typeof pageData === 'string') return pageData;
    
    return this.renderChild(...pageData);
    
  }
}

