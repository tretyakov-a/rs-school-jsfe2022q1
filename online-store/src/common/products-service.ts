import { Product } from "./product";
import json from '@assets/data-sample.json';
import { BASE_URL } from "./constants";

export interface IProductsService {
  load(): Promise<Product[]>
}

export class DummyProductsService implements IProductsService {
  public async load(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // const random = Math.random();
        // if (random < 0.1) {
        //   return reject(new Error('Data load error!'));
        // }
        resolve(json);
      }, 500);
    });
  }
}

export class ProductsService implements IProductsService {
  public async load(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/data-21.json`);
    if (!res.ok) {
      throw new Error('Data load error!')
    }
    const data: Product[] = await res.json();
    return data;
  }
}