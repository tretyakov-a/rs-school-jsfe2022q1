import { selectFrom, withNullCheck } from "@common/utils";
import { View, ViewOptions } from "@core/view";
import { SpinnerView } from '@views/spinner';
import { Emmiter } from "./emmiter";

const isLog = false;

export type ComponentHandler = (() => void) | ((data?: unknown) => void);
export type ComponentHandlers = Record<string, ComponentHandler>;

export type ComponentOptions = {
  data?: unknown
}

export type ComponentProps = {
  view?: View;
  emmiter?: Emmiter | null;
  handlers?: ComponentHandlers;
  root?: HTMLElement | string | null;
  viewOptions?: ViewOptions;
  viewConstructor?: typeof View;
  componentOptions?: unknown;
  data?: unknown;
};

export type ChildComponentData = [ string, typeof Component, ComponentProps? ];

export class Component {
  protected components: ChildComponentData[];
  protected _components: Record<string, Component | Component[]>;
  protected emmiter: Emmiter | null;
  protected handlers: ComponentHandlers;
  protected _root: HTMLElement | string | null;
  protected viewConstructor: typeof View;
  protected view: View;
  protected listenersForRemove: (() => void)[];

  constructor(props: ComponentProps) {
    isLog && console.log('COMPONENT CONSTRUCTING...', Object.getPrototypeOf(this).constructor.name, props);

    this.components = [];
    this._components = {};
    this.emmiter = props.emmiter || null;
    this.handlers = props.handlers || {};
    this._root = props.root || null;
    this.viewConstructor = props.viewConstructor || View;
    this.view = new this.viewConstructor({
      ...props.viewOptions,
      root: props.root,
    });
    this.listenersForRemove = [];
    
    if (Object.getPrototypeOf(this).constructor.name === 'Component') {
      isLog && console.log('COMPONENT CONSTRUCTING... UPDATE CALLED')
      this.update(props.data);
    }
  }

  protected addChild(
    name: string,
    componentConstructor: typeof Component,
    childProps: ComponentProps = {},
  ): void{
    isLog && console.log(`ADD CHILD: '${name}'[${componentConstructor.name}]`)
    const newComponent = new componentConstructor({
      emmiter: this.emmiter,
      root: this.getMountPoint(),
      ...childProps,
    });
    const child = this._components[name];
    if (child !== undefined) {
      if (Array.isArray(child))
        child.push(newComponent);
      else {
        this._components[name] = [child, newComponent];
      }
    } else {
      this._components[name] = newComponent;
    }
  }

  protected getChild(name: string) {
    return this._components[name];
  }

  protected get root(): HTMLElement | null {
    if (!this._root) {
      return null;
    }
    if (typeof this._root === 'string') {
      this._root = selectFrom(document)(this._root);
    }
    return this._root;
  }

  protected getComponents() {
    return this._components;
  }
  
  protected getMountPoint(): HTMLElement {
    return withNullCheck(this.view?.getMountPoint());
  }

  protected getRoot(): HTMLElement {
    return withNullCheck(this.root);
  }

  protected getElement(): HTMLElement {
    return withNullCheck(this.view?.getElement());
  }

  protected onLoadingStart(): void {
    this.addChild('spinner', Component, {
      viewConstructor: SpinnerView,
      root: this.getMountPoint(),
    })
  }

  protected onLoadingEnd(data?: unknown): void {
    this.update(data);
  }

  protected clear(): void {
    this.view?.clear();
  }

  protected update(data?: unknown): void {
    isLog && console.log('SUPER UPDATE: ', Object.getPrototypeOf(this).constructor.name, this.viewConstructor.name);
    if (!this.root) return;
    
    if (Object.keys(this._components).length > 0)  {
      this.removeChildrens();
    }

    this.view.render(data);
    if (this.components.length !== 0) {
      this.renderChildrens(data);
    }
  }

  private renderChildrens(data?: unknown): void {
    isLog && console.log('BUILD components width data:', data);

    this.components.forEach(([name, constructor, props]) => {
      this.addChild(name, constructor, {
        ...props,
        root: this.getElement(),
      });
    }) 
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
    // console.log('Removing listeners: ', this.listenersForRemove.length);
    this.listenersForRemove.forEach((fn) => fn.call(null));
    this.removeChildrens();
  }

  protected emit(event: string, data?: unknown) {
    this.emmiter?.emit(event, data);
  }

  protected on(event: string, listener: (e: CustomEvent) => void) {
    if (this.emmiter) {
      this.listenersForRemove.push(
        this.emmiter.on(event, listener)
      )
    }
  }
}