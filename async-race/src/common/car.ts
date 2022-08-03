export type Car = {
  name: string;
  color: string;
  id: string;
}

export type CarData = Omit<Car, 'id'>;
