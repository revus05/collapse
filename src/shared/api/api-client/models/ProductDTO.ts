/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductDTO = {
    /**
     * Product uuid
     */
    uuid: string;
    /**
     * List of image URLs
     */
    images: Array<string>;
    /**
     * Product title
     */
    title: string;
    /**
     * Inside color
     */
    insideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Outside color
     */
    outsideColors: Array<'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW'>;
    /**
     * Price in BYN
     */
    priceBYN: number;
    /**
     * Price in RUB
     */
    priceRUB: number;
    /**
     * Discount price in BYN
     */
    discountPriceBYN?: number;
    /**
     * Discount price in RUB
     */
    discountPriceRUB?: number;
    /**
     * Product description
     */
    description: string;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

