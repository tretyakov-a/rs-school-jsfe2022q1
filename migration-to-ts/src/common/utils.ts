
export const selectFrom = (el: HTMLElement | Document) => (query: string): HTMLElement => el.querySelector(query) as HTMLElement;
