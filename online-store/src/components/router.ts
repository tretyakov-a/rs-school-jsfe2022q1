import { ActiveRoute } from '@common/active-route';
import { EVENT } from '@common/constants';
import { ChildComponentData, Component, ComponentProps } from '@core/component';

type Routes = Record<string, ChildComponentData>;

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

  private getRouteData(): ChildComponentData | string {
    let path = ActiveRoute.getPath();
    if (path === '') path += '#';

    if (this.routes[path] === undefined) {
      return 'Error 404. Page not found.';
    }

    return this.routes[path];
  }

  private handlePageChange = () => {
    const pageData = this.getRouteData();
    this.update(pageData);
    this.emit(EVENT.CHANGE_PAGE);
  }

  protected render(data?: string | ChildComponentData): string {
    super.render();

    let pageData = data;
    if (pageData === undefined) {
      pageData = this.getRouteData();
    };
    if (typeof pageData === 'string') return pageData;
    
    return this.renderChild(...pageData);
    
  }
}

