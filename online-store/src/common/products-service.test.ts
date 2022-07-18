import { ProductsService } from '@common/products-service';

const products = [
  {
    "brand": "JJRC",
    "brandImage": "images/brand/ecb86172b43f0c91f7051e504403bd6c469e7104c0507041fd13b9c9fce32269.png",
    "description": "Квадрокоптер JJRC H83",
    "id": "795abdd5e7673332",
    "imgs": [
      "images/product/fd01113951cc95a7e8d31ea6a7015ff4ae713fed7990e5aa3f357365cc8ae615.jpg",
    ],
    "price": 1599,
    "props": {},
    "rating": 3.5,
    "title": "Квадрокоптер JJRC H83 [2015, зеленый, ПМ: 30.1 г]",
    "year": 2015
  },
];

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(JSON.parse(JSON.stringify(products))),
  })
);

describe('Test ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });
  
  test('correctly create class instance', () => {
    expect(service).toBeDefined();
    expect(service.load).toBeDefined();
  });

  test('load method works properly', async () => {

    const result = await service.load();
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(products);

    // @ts-ignore
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    await expect(service.load()).rejects
      .toThrow('Data load error!');
  });
});
