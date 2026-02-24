export const tags = {
  BAGS: "Сумки",
  SALES: "Скидки",
  NEW: "Новинки",
  LIMIT: "Лимитированные",
  CLOTHES: "Одежда",
  ACCESSORIES: "Аксессуары",
} as const;

export const tagsValues = Object.keys(tags) as Array<keyof typeof tags>;
