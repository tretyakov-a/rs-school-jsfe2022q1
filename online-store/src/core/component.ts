import { withNullCheck } from "@common/utils";
import { View, ViewOptions } from "@core/view";
import { Emmiter } from "./emmiter";
import { ComponentEmmiter } from './componentEmmiter';

const isLog = false;

export type ComponentHandler = (() => void) | ((data?: unknown) => void);
export type ComponentHandlers = Record<string, ComponentHandler>;

export type ComponentOptions = {
  data?: unknown
}

export type ComponentProps = {
  name?: string,
  parent?: Component;
  view?: View;
  emmiter: Emmiter;
  handlers?: ComponentHandlers;
  root?: HTMLElement | string | null;
  viewOptions?: Partial<ViewOptions>;
  viewConstructor?: typeof View;
  data?: unknown;
};

export type ChildComponentData = [ string, typeof Component, ComponentProps? ];

export type renderChildOptions = [ string, typeof Component, Partial<ComponentProps>? ];

function log(this: Component, message: string, { data, forceLog = isLog }: { data?: unknown, forceLog?: boolean} = {} ) {
  forceLog && console.log(`%c${message}`, 'color: blue;', Object.getPrototypeOf(this).constructor.name, this.viewConstructor?.name, data || '');
}

export class Component extends ComponentEmmiter {
  protected name: string;
  protected id: number;
  protected parent: Component | null;
  protected _components: Record<string, Component | Component[]>;
  protected handlers: ComponentHandlers;
  protected viewConstructor: typeof View;
  protected view: View;

  constructor(props: ComponentProps) {
    super(props.emmiter);

    this.name = props.name || '';
    this.id = -1;
    this.parent = props.parent || null;
    this._components = {};
    this.handlers = props.handlers || {};
    this.viewConstructor = props.viewConstructor || View;

    if (this.viewConstructor.name === 'View' && props.viewOptions?.root === undefined) {
      throw new Error(`You should specify root for component (${this.constructor.name}) with no view`);
    }

    this.view = new this.viewConstructor({
      ...props.viewOptions,
      component: this,
    });
    
    log.call(this, 'COMPONENT CONSTRUCTING END');
  }

  public renderChild(...[name, componentConstructor, childProps = {}]: renderChildOptions): string {

    log.call(this, 'COMPONENT ADD CHILD:', { data: `'${name}'[${componentConstructor.name}]` });
    const newComponent = new componentConstructor({
      ...childProps,
      name,
      parent: this,
      emmiter: this.emmiter,
    });
    const child = this._components[name];
    if (child !== undefined) {
      if (Array.isArray(child)) {
        newComponent.id = child.length;
        child.push(newComponent);
      } else {
        child.id = 0;
        newComponent.id = 1;
        this._components[name] = [child, newComponent];
      }
    } else {
      this._components[name] = newComponent;
    }
    return newComponent.render(childProps.data);
  }

  public isArrayItem() {
    return this.id !== -1;
  }
  
  public update(data?: unknown) {
    this.parent?.updateChild(this, data);
  }

  protected updateChild(child: Component, data?: unknown) {
    log.call(this, 'UPDATING', { data: `CHILD: ${child.name}` });
    const el = child.getRoot();
    
    let html = child.render(data);
    if (child.view.constructor.name === 'View') {
      const elClone = el.cloneNode() as HTMLElement;
      elClone.innerHTML = html;
      el.after(elClone);
    } else {
      el.insertAdjacentHTML('afterend', html);
    }
    el.parentNode?.removeChild(el);
    child.afterRender();
  }

  protected getChild(name: string): Component | Component[] {
    return this._components[name];
  }

  public getComponent(name: string) {
    return this._components[name];
  }

  public getComponents() {
    return this._components;
  }

  public getRoot(): HTMLElement {
    return this.view.getRoot();
  }

  protected onLoadingStart(): void {
    this.view.isLoading = true;
  }

  protected onLoadingEnd(data?: unknown): void {
    this.view.isLoading = false;
    this.update(data);
  }

  protected render(data?: unknown): string {
    log.call(this, 'COMPONENT RENDER: ');
    if (Object.keys(this._components).length > 0)  {
      this.removeChildrens();
    }

    return this.view.render(data);
  }

  protected afterRender(): void {
    log.call(this, 'COMPONENT AFTER RENDER', { data: this.parent?.getRoot() });
    this.view.afterRender(this.parent, this.id);

    Object.keys(this._components).forEach((key) => {
      const comp = this._components[key];
      if (Array.isArray(comp)) {
        comp.forEach((item) => item.afterRender());
      } else {
        comp.afterRender();
      }
    });
  }

  private removeChildrens() {
    Object.keys(this._components).forEach((key) => {
      const comp = this._components[key];
      if (Array.isArray(comp)) {
        comp.forEach((item) => item.onDestroy());
      } else {
        comp.onDestroy();
      }
    });
    this._components = {};
  }

  protected onDestroy() {
    this.listenersForRemove.forEach((fn) => fn.call(null));
    this.removeChildrens();
  }
}