
import { Emmiter } from './emmiter';

export class ComponentEmmiter {
  protected emmiter: Emmiter;
  protected listenersForRemove: (() => void)[];

  constructor(emmiter: Emmiter) {
    this.emmiter = emmiter;
    this.listenersForRemove = [];
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