import { Component } from "@core/component";

export function isCustomEvent(evt: Event): evt is CustomEvent {
  return 'detail' in evt;
}

export const useCustom = (listener: (e: CustomEvent) => void) => (evt: Event) => {
  if (!isCustomEvent(evt)) {
    throw new TypeError();
  }
  listener(evt);
}

export const withNullCheck = (el?: Element | null): HTMLElement => {
  if (!el || !(el instanceof HTMLElement)) {
    throw new TypeError();
  }
  return el;
}

export const selectFrom = (el: HTMLElement | Document) => (query: string): HTMLElement => {
  return withNullCheck(el.querySelector(query));
};

export const loadImage = (src?: string | null): Promise<string> => new Promise((resolve, reject) => {
  if (!src) {
    return reject(new Error(`Image src is undefined`));
  }
  const img = new Image();
  img.src = src;
  img.addEventListener('error', reject);
  img.addEventListener('load', () => resolve(src));
})

export function printComponentsTree(this: Component, layerCount = 0) {
  console.log(`${'..'.repeat(layerCount)}${this.name}`);
  const comps = this.getComponents();
  if (Object.keys(comps).length === 0) return;

  Object.keys(comps).forEach((key) => {
    const comp = comps[key];
    if (Array.isArray(comp)) {
      comp.forEach(c => printComponentsTree.call(c, layerCount + 1));
    } else {
      printComponentsTree.call(comp, layerCount + 1);
    }
  })
}

export function debounce(this: unknown, ms: number, fn: (arg: Event) => void) {
  let timer = -1;
  const wrapper = (e: Event) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.call(this, e);
    }, ms);
  }
  return wrapper;
}

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export function queryOptionsToString(queryOptions: Record<string, string | number>): string {
  return Object.entries(queryOptions)
    .map((opt) => opt.join('='))
    .join('&');
}

export async function performServiceOperation<T>(opResult: Promise<T>): Promise<T | Error | undefined> {
  try {
    return await opResult;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}

export function generateColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
