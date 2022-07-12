import { Component } from "@core/component";
import { DEFAULT_FILTER_OPTION } from "./constants";

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


const createOption = (value: string): HTMLElement => {
  const optionEl = document.createElement('option');
  optionEl.value = value;
  optionEl.textContent = value;
  return optionEl;
}

export const addOptions = (
  container: HTMLElement,
  data: string[],
  cb: (el: HTMLElement, value: string) => HTMLElement = (el) => el
): void => {
  container.append(createOption(DEFAULT_FILTER_OPTION));
  
  data.forEach((value) => {
    const optionEl = cb(createOption(value), value);
    container.append(optionEl);
  });
}

export const loadImage = (src?: string | null): Promise<string> => new Promise((resolve, reject) => {
  if (!src) {
    return reject(new Error(`Image src is undefined`));
  }
  const img = new Image();
  img.src = src;
  img.addEventListener('error', reject);
  img.addEventListener('load', () => resolve(src));
})

export function printComponentsTree(this: Component, layerCount: number = 0) {
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