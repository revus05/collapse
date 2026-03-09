import type { ProductDTO } from "shared/api";

export const testProducts: ProductDTO[] = [
  {
    uuid: "test-karma-void",
    images: ["/images/products/KARMA-1.jpg", "/images/products/KARMA-2.jpg"],
    title: "KARMA VOID",
    description:
      "Тестовая городская сумка с плотным каркасом, внешними ремнями и контрастной подкладкой.",
    insideColors: ["RED", "BLACK"],
    outsideColors: ["BLACK", "GRAPHITE"],
    tags: ["BAGS", "NEW"],
    priceBYN: 420,
    priceRUB: 11900,
    discountPriceBYN: 380,
    discountPriceRUB: 10800,
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    uuid: "test-shuttle-grid",
    images: [
      "/images/products/SHUTTLE-1.jpg",
      "/images/products/SHUTTLE-2.jpg",
    ],
    title: "SHUTTLE GRID",
    description:
      "Тестовый рюкзак для поездок и ноутбука. Вмещает документы, зарядки и повседневные мелочи.",
    insideColors: ["CYAN", "LIME"],
    outsideColors: ["GRAPHITE", "BLACK"],
    tags: ["BAGS", "LIMIT"],
    priceBYN: 510,
    priceRUB: 14500,
    discountPriceBYN: 470,
    discountPriceRUB: 13300,
    createdAt: "2026-03-02T10:00:00.000Z",
    updatedAt: "2026-03-02T10:00:00.000Z",
  },
  {
    uuid: "test-samurai-signal",
    images: [
      "/images/products/SAMURAI-1.jpg",
      "/images/products/SAMURAI-2.jpg",
    ],
    title: "SAMURAI SIGNAL",
    description:
      "Тестовая сумка с акцентной фактурой и заметной графикой. Подходит для коротких выездов и города.",
    insideColors: ["ORANGE", "YELLOW"],
    outsideColors: ["WHITE", "BLACK"],
    tags: ["BAGS", "SALES"],
    priceBYN: 390,
    priceRUB: 11100,
    discountPriceBYN: 340,
    discountPriceRUB: 9600,
    createdAt: "2026-03-03T10:00:00.000Z",
    updatedAt: "2026-03-03T10:00:00.000Z",
  },
];

export const getCatalogProducts = (products: ProductDTO[] = []) => {
  const uniqueProducts = new Map<string, ProductDTO>();

  for (const product of products) {
    uniqueProducts.set(product.uuid, product);
  }

  for (const product of testProducts) {
    if (!uniqueProducts.has(product.uuid)) {
      uniqueProducts.set(product.uuid, product);
    }
  }

  return Array.from(uniqueProducts.values());
};

export const getCatalogProductByUuid = (
  uuid: string,
  products: ProductDTO[] = [],
) =>
  getCatalogProducts(products).find((product) => product.uuid === uuid) ?? null;

export const searchCatalogProducts = (
  products: ProductDTO[] = [],
  query: string,
) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getCatalogProducts(products);
  }

  return getCatalogProducts(products).filter((product) =>
    [product.title, product.description, ...product.tags]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
};
