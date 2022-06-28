
export type ViewOptions<T> = {
  data: T[];
  name?: string
}

export interface View<T> {
  draw(options?: ViewOptions<T>): void;
}
