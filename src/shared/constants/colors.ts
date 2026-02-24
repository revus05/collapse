export const colors = {
  RED: "Красный",
  GRAPHITE: "Графитовый",
  GREEN: "Зеленый",
  VIOLET: "Фиолетовый",
  ORANGE: "Оранжевый",
  DARK_RED: "Бордовый",
  BLACK: "Черный",
  CYAN: "Бирюзовый",
  PINK: "Розовый",
  WHITE: "Белый",
  LIME: "Лаймовый",
  YELLOW: "Желтый",
} as const;

export const colorValues = Object.keys(colors) as Array<keyof typeof colors>;
