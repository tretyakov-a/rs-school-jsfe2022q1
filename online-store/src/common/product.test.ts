import { isEqualProductsArrays, PROP, propPickers } from './product';

const productsA = [
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
  {
    "brand": "JJRC",
    "brandImage": "images/brand/ecb86172b43f0c91f7051e504403bd6c469e7104c0507041fd13b9c9fce32269.png",
    "description": "Квадрокоптер JJRC H83 выполнен в компактном корпусе синего цвета размерами 92x30x92 мм и имеет полетную массу 200 г. Модель со сложной электроникой обладает обтекаемым дизайном для более плавного движения по воздуху. Корпус дрона выполнен из ударопрочного пластика и содержит четыре пропеллера. Его особенность в защите лопастей и лучей от повреждений при столкновениях и падениях, благодаря чему повышается безопасность эксплуатации.  Для полетов внутри квадрокоптера JJRC H83 устанавливается Li-Pol-аккумулятор емкостью 300 мА·ч, от которого робот будет работать на протяжении 6 минут. Для управления используется пульт ДУ с радиусом действия 25 м, в который устанавливаются три батарейки ААА. Маневренный и быстрый дрон совершает кувырки на 360 градусов, поддерживает два режима скорости, характеризуется легкостью в управлении, что делает его идеальным вариантом для освоения пилотирования.",
    "id": "a74447813e7a3332",
    "imgs": [
      "images/product/c808fe75cefe223f60315807e2f9f402c400f10dbdc2250d16ca77e41ce607cb.jpg",
    ],
    "price": 1699,
    "props": {},
    "rating": 3.5,
    "title": "Квадрокоптер JJRC H83 [2020, синий, ПМ: 200 г]",
    "year": 2020
  },
  {
    "brand": "Syma",
    "brandImage": "images/brand/d92e4d2792ab71faff23af11b2801b94be54eb8b76ce0995be19abb4e8844fa2.jpg",
    "description": "Квадрокоптер Syma X20-S невероятно компактен. Габаритные размеры модели составляют 105x105x25 мм. Микрокоптер оснащен коллекторным двигателем. Диаметр пропеллеров составляет 55 мм. Приблизительная продолжительность полета равна 5 мин. При низком уровне заряда батареи квадрокоптер осуществляет автоматическую посадку. Удержание высоты производится с помощью барометра. Коптер способен осуществлять переворот на 360°. Поддерживается функция следования за пультом управления.  Квадрокоптер Syma X20-S получает питание от 3.7-вольтового литий-ионного аккумулятора, емкость которого равна 180 мА·ч. Время зарядки аккумулятора составляет 50 мин. Для управления моделью используется пульт дистанционного управления, радиус действия которого равен 70 м. Обмен данными между пультом и коптером происходит на частоте 2.4 ГГц. Пульт отличается простотой управления. Разобраться в тонкостях обращения с пультом можно за считанные минуты, а то и секунды. Корпус квадрокоптера, изготовленный из ABS-пластика, имеет белый цвет.",
    "id": "279079561d533332",
    "imgs": [
      "images/product/09846664166a59ceaa7a6d209ff2c31eefa913ac8e2bd8dc5e9444f354296f06.jpg",
    ],
    "price": 2099,
    "props": {},
    "rating": 4,
    "title": "Квадрокоптер Syma X20-S [2017, белый, ПМ: 115 г]",
    "year": 2017
  },
];
const productsAEqual = JSON.parse(JSON.stringify(productsA));
const productsB = [
  {
    "brand": "JJRC",
    "brandImage": "images/brand/ecb86172b43f0c91f7051e504403bd6c469e7104c0507041fd13b9c9fce32269.png",
    "description": "Квадрокоптер JJRC H83 выполнен в компактном корпусе синего цвета размерами 92x30x92 мм и имеет полетную массу 200 г. Модель со сложной электроникой обладает обтекаемым дизайном для более плавного движения по воздуху. Корпус дрона выполнен из ударопрочного пластика и содержит четыре пропеллера. Его особенность в защите лопастей и лучей от повреждений при столкновениях и падениях, благодаря чему повышается безопасность эксплуатации.  Для полетов внутри квадрокоптера JJRC H83 устанавливается Li-Pol-аккумулятор емкостью 300 мА·ч, от которого робот будет работать на протяжении 6 минут. Для управления используется пульт ДУ с радиусом действия 25 м, в который устанавливаются три батарейки ААА. Маневренный и быстрый дрон совершает кувырки на 360 градусов, поддерживает два режима скорости, характеризуется легкостью в управлении, что делает его идеальным вариантом для освоения пилотирования.",
    "id": "a74447813e7a3332",
    "imgs": [
      "images/product/c808fe75cefe223f60315807e2f9f402c400f10dbdc2250d16ca77e41ce607cb.jpg",
    ],
    "price": 1699,
    "props": {},
    "rating": 3.5,
    "title": "Квадрокоптер JJRC H83 [2020, синий, ПМ: 200 г]",
    "year": 2020
  },
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
  {
    "brand": "Syma",
    "brandImage": "images/brand/d92e4d2792ab71faff23af11b2801b94be54eb8b76ce0995be19abb4e8844fa2.jpg",
    "description": "Квадрокоптер Syma X20-S невероятно компактен. Габаритные размеры модели составляют 105x105x25 мм. Микрокоптер оснащен коллекторным двигателем. Диаметр пропеллеров составляет 55 мм. Приблизительная продолжительность полета равна 5 мин. При низком уровне заряда батареи квадрокоптер осуществляет автоматическую посадку. Удержание высоты производится с помощью барометра. Коптер способен осуществлять переворот на 360°. Поддерживается функция следования за пультом управления.  Квадрокоптер Syma X20-S получает питание от 3.7-вольтового литий-ионного аккумулятора, емкость которого равна 180 мА·ч. Время зарядки аккумулятора составляет 50 мин. Для управления моделью используется пульт дистанционного управления, радиус действия которого равен 70 м. Обмен данными между пультом и коптером происходит на частоте 2.4 ГГц. Пульт отличается простотой управления. Разобраться в тонкостях обращения с пультом можно за считанные минуты, а то и секунды. Корпус квадрокоптера, изготовленный из ABS-пластика, имеет белый цвет.",
    "id": "279079561d533332",
    "imgs": [
      "images/product/09846664166a59ceaa7a6d209ff2c31eefa913ac8e2bd8dc5e9444f354296f06.jpg",
    ],
    "price": 2099,
    "props": {},
    "rating": 4,
    "title": "Квадрокоптер Syma X20-S [2017, белый, ПМ: 115 г]",
    "year": 2017
  },
];

const product = {
  "brand": "JJRC",
  "brandImage": "images/brand/ecb86172b43f0c91f7051e504403bd6c469e7104c0507041fd13b9c9fce32269.png",
  "description": "Квадрокоптер JJRC H83 выполнен в ярком корпусе в сочетании зеленого и черного цветов. Эта модель обладает сложной электроникой, а ее дизайн предусматривает наличие плавных линий корпуса. Компактное устройство помещается легко на ладони, поэтому его очень удобно брать с собой, положив в сумку. Конструкция модели предусматривает наличие четырехлопастных пропеллеров, сделанных из ударопрочного пластика. Это говорит о том, что значимые элементы квадрокоптера не пострадают даже при столкновениях и падениях.  Для работы JJRC H83 используется аккумулятор Li-pol емкостью 300 мА·ч, полного заряда которого будет достаточно для полета в течение 6 минут. В пульт ДУ потребуется установка трех батареек AAA. Стабильный сигнал квадрокоптера с пультом будет достигнут в радиусе 25 м, что дает возможность разогнаться и испытать полностью возможности устройства. Особенность модели в способности переворачиваться в полете. Квадрокоптер поддерживает две скорости полета.",
  "id": "795abdd5e7673332",
  "imgs": [
    "images/product/fd01113951cc95a7e8d31ea6a7015ff4ae713fed7990e5aa3f357365cc8ae615.jpg",
  ],
  "price": 1599,
  "props": {
    "dimensions": {
      "title": "Габариты и Вес",
      "specs": {
        "height": {
          "title": "Высота",
          "value": "30 мм"
        },
        "len": {
          "title": "Длина",
          "value": "92 мм"
        },
        "material": {
          "title": "Материал корпуса",
          "value": "пластик"
        },
        "weight": {
          "title": "Полетная масса",
          "value": "30.1 г"
        },
        "width": {
          "title": "Ширина",
          "value": "92 мм"
        }
      }
    },
    "additionalInfo": {
      "title": "Дополнительная информация",
      "specs": {
        "equipment": {
          "title": "Комплектация",
          "value": "пульт управления, аккумулятор"
        },
        "extra": {
          "title": "Особенности, дополнительно",
          "value": "кульбит на 360 градусов, 2 режима скорости"
        }
      }
    },
    "factoryData": {
      "title": "Заводские данные",
      "specs": {
        "guarantee": {
          "title": "Гарантия от производителя",
          "value": "3 мес."
        }
      }
    },
    "camera": {
      "title": "Камера",
      "specs": {
        "fpv": {
          "title": "Вид от первого лица (FPV)",
          "value": "нет"
        },
        "cameraIncluded": {
          "title": "Наличие камеры в комплекте",
          "value": "нет"
        }
      }
    },
    "classification": {
      "title": "Классификация",
      "specs": {
        "model": {
          "title": "Модель",
          "value": "JJRC H83"
        },
        "color": {
          "title": "Основной цвет",
          "value": "зеленый"
        },
        "size": {
          "title": "Размер",
          "value": "микро"
        },
        "type": {
          "title": "Тип",
          "value": "квадрокоптер"
        },
        "engineType": {
          "title": "Тип двигателя",
          "value": "коллекторный"
        }
      }
    },
    "flightCharacteristics": {
      "title": "Летные характеристики",
      "specs": {
        "gps": {
          "title": "GPS",
          "value": "нет"
        },
        "autoLanding": {
          "title": "Автовзлет и автопосадка",
          "value": "нет"
        },
        "sdditionalFlightFeatures": {
          "title": "Дополнительные функции полета",
          "value": "выполнение кульбитов"
        },
        "flightTrajectory": {
          "title": "Полет по заданной траектории",
          "value": "нет"
        },
        "flightDuration": {
          "title": "Приблизительная продолжительность полета",
          "value": "6 мин"
        },
        "altitudePointHold": {
          "title": "Удержание точки высоты",
          "value": "нет"
        }
      }
    },
    "power": {
      "title": "Питание летательного аппарата",
      "specs": {
        "batteryCapacity": {
          "title": "Емкость аккумулятора",
          "value": "300 мА*ч"
        },
        "batteryNumber": {
          "title": "Количество аккумуляторов в комплекте",
          "value": "1"
        },
        "batteryVoltage": {
          "title": "Напряжение аккумулятора",
          "value": "3.7 В"
        },
        "batteryType": {
          "title": "Тип аккумулятора",
          "value": "Li-Pol"
        }
      }
    },
    "mobileSupport": {
      "title": "Поддержка мобильных устройств",
      "specs": {
        "mobileAttach": {
          "title": "Крепление мобильного устройства на ПДУ",
          "value": "нет"
        },
        "tabletSupport": {
          "title": "Поддержка смартфона/планшета",
          "value": "нет"
        },
        "compatibleOs": {
          "title": "Совместимые операционные системы",
          "value": "нет"
        },
        "mobileControl": {
          "title": "Управление со смартфона",
          "value": "нет"
        }
      }
    },
    "remoteControlDevice": {
      "title": "Пульт дистанционного управления",
      "specs": {
        "remoteControlDeviceIncluded": {
          "title": "Пульт ДУ в комплекте",
          "value": "есть"
        },
        "controlRadius": {
          "title": "Радиус действия",
          "value": "25 м"
        },
        "headlessMode": {
          "title": "Режим Headless Mode",
          "value": "нет"
        },
        "remoteControlDeviceScreen": {
          "title": "Экран ПДУ",
          "value": "нет"
        },
        "remoteControlDeviceBattery": {
          "title": "Элементы питания ПДУ",
          "value": "батарейки AAA - 3 шт"
        }
      }
    }
  },
  "rating": 3.5,
  "title": "Квадрокоптер JJRC H83 [2015, зеленый, ПМ: 30.1 г]",
  "year": 2015
};

describe('Test product module functions', () => {
  test('isEqualProductsArrays works properly', () => {
    expect(isEqualProductsArrays(productsA, productsAEqual)).toBe(true);
    expect(isEqualProductsArrays(productsA, productsB)).toBe(false);
    expect(isEqualProductsArrays(productsA, [])).toBe(false);
  });

  test('propPickers work properly', () => {

    const expected = [
      [PROP.PRICE, 'number', 1599],
      [PROP.RATING, 'number', 3.5],
      [PROP.YEAR, 'number', 2015],
      [PROP.BRAND, 'string', 'JJRC'],
      [PROP.COLOR, 'string', 'зеленый'],
      [PROP.WEIGHT, 'number', 30.1],
      [PROP.MOBILE_CONTROL, 'string', 'нет'],
      [PROP.CAMERA_INCLUDED, 'string', 'нет'],
      [PROP.TITLE, 'string', 'Квадрокоптер JJRC H83 [2015, зеленый, ПМ: 30.1 г]'],
      [PROP.SIZE, 'string', 'микро'],
    ]
    
    expected.forEach(([propPicker, expectedResultType, expectedResult]) => {
      const result = propPickers[propPicker](product);
      expect(typeof result).toBe(expectedResultType);
      expect(result).toBe(expectedResult);
    })
  })
});
