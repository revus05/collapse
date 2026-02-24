/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductRequestDTO = {
    /**
     * Список изображений
     */
    images?: Array<string>;
    /**
     * Название продукта
     */
    title: string;
    /**
     * Цвет внутри
     */
    insideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Цвет снаружи
     */
    outsideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    tags?: Array<'BAGS' | 'SALES' | 'NEW' | 'LIMIT' | 'CLOTHES' | 'ACCESSORIES'>;
    /**
     * Цена BYN
     */
    priceBYN: number;
    /**
     * Цена RUB
     */
    priceRUB: number;
    /**
     * Скидочная цена BYN
     */
    discountPriceBYN?: number;
    /**
     * Скидочная цена RUB
     */
    discountPriceRUB?: number;
    /**
     * Описание продукта
     */
    description: string;
};

