import { DEFAULT_FILTER_OPTION } from "./constants";

export const selectFrom = (el: HTMLElement | Document) => (query: string): HTMLElement => el.querySelector(query) as HTMLElement;

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