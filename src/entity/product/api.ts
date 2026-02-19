export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  images: string[];
}

const IMAGES_DIR = "/images/products";
const products: Product[] = [
  {
    id: "1",
    name: "Городская сумка SAMURAI",
    price: 299,
    discountPrice: 279,
    images: [`${IMAGES_DIR}/SAMURAI-1.jpg`, `${IMAGES_DIR}/SAMURAI-2.jpg`],
  },
  {
    id: "2",
    name: "Сумка EDGERUNNER",
    images: [
      `${IMAGES_DIR}/EDGERUNNER-1.jpg`,
      `${IMAGES_DIR}/EDGERUNNER-2.jpg`,
    ],
    price: 299,
    discountPrice: null,
  },
  {
    id: "3",
    name: "Городская сумка TOKEN",
    images: [`${IMAGES_DIR}/TOKEN-1.jpg`, `${IMAGES_DIR}/TOKEN-2.jpg`],
    price: 159,
    discountPrice: null,
  },
  {
    id: "4",
    name: "Сумка EVA-02",
    images: [`${IMAGES_DIR}/EVA02-1.jpg`, `${IMAGES_DIR}/EVA02-2.jpg`],
    price: 219,
    discountPrice: null,
  },
  {
    id: "5",
    name: "Рюкзак PHANTOM",
    images: [`${IMAGES_DIR}/PHANTOM-1.jpg`, `${IMAGES_DIR}/PHANTOM-2.jpg`],
    price: 399,
    discountPrice: null,
  },
  {
    id: "6",
    name: "Городская сумка KARMA",
    images: [`${IMAGES_DIR}/KARMA-1.jpg`, `${IMAGES_DIR}/KARMA-2.jpg`],
    price: 199,
    discountPrice: null,
  },
  {
    id: "7",
    name: "Мессенджер VOID 01",
    images: [`${IMAGES_DIR}/VOID01-1.jpg`, `${IMAGES_DIR}/VOID01-2.jpg`],
    price: 259,
    discountPrice: null,
  },
  {
    id: "9",
    name: "Мессенджер VOID 02",
    images: [`${IMAGES_DIR}/VOID02-1.jpg`, `${IMAGES_DIR}/VOID02-2.jpg`],
    price: 259,
    discountPrice: null,
  },
  {
    id: "10",
    name: "Городская сумка SHUTTLE M.O.L.L.E",
    images: [`${IMAGES_DIR}/SHUTTLE-1.jpg`, `${IMAGES_DIR}/SHUTTLE-2.jpg`],
    price: 199,
    discountPrice: null,
  },
  {
    id: "11",
    name: "Городская сумка SHADOW M.O.L.L.E",
    images: [`${IMAGES_DIR}/SHADOW-1.jpg`, `${IMAGES_DIR}/SHADOW-2.jpg`],
    price: 199,
    discountPrice: null,
  },
  {
    id: "12",
    name: "Сумка Doom Slayer",
    images: [
      `${IMAGES_DIR}/DOOM-SLAYER-1.jpg`,
      `${IMAGES_DIR}/DOOM-SLAYER-2.jpg`,
    ],
    price: 339,
    discountPrice: null,
  },
  {
    id: "13",
    name: "Мессенджер MAELSTROM",
    images: [`${IMAGES_DIR}/MAELSTROM-1.jpg`, `${IMAGES_DIR}/MAELSTROM-2.jpg`],
    price: 339,
    discountPrice: null,
  },
  {
    id: "14",
    name: "Мессенджер FLAGMAN",
    images: [`${IMAGES_DIR}/FLAGMAN-1.jpg`, `${IMAGES_DIR}/FLAGMAN-2.jpg`],
    price: 379,
    discountPrice: null,
  },
  {
    id: "15",
    name: "EVA-00",
    images: [`${IMAGES_DIR}/EVA00-1.jpg`, `${IMAGES_DIR}/EVA00-2.jpg`],
    price: 379,
    discountPrice: null,
  },
  {
    id: "16",
    name: "EVA-01",
    images: [`${IMAGES_DIR}/EVA01-1.jpg`, `${IMAGES_DIR}/EVA01-2.jpg`],
    price: 379,
    discountPrice: null,
  },
  {
    id: "17",
    name: "VOID-01",
    images: [`${IMAGES_DIR}/EVA01-1.jpg`, `${IMAGES_DIR}/EVA01-2.jpg`],
    price: 379,
    discountPrice: null,
  },
];
export const getProducts = async () => Promise.resolve(products);
