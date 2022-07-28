
export interface IStorageService<T> {
  save(data: T | null): Promise<void>;
  load(): Promise<T | null>;
}

export class LocalStorageService<T> implements IStorageService<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async save(data: T): Promise<void> {
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }

  async load(): Promise<T | null> {
    const dataString = window.localStorage.getItem(this.key);
    if (dataString === null) return null;
    return JSON.parse(dataString);
  }
}