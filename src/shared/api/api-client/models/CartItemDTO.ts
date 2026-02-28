/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDTO } from './ProductDTO';
export type CartItemDTO = {
    /**
     * User uuid
     */
    uuid: string;
    /**
     * Product
     */
    product: ProductDTO;
    /**
     * Price
     */
    price: number;
    /**
     * Currency
     */
    currency: 'BYN' | 'RUB';
    /**
     * Quantity
     */
    quantity: number;
    /**
     * Inside color
     */
    insideColor: 'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW';
    /**
     * Outside color
     */
    outsideColor: 'RED' | 'GRAPHITE' | 'GREEN' | 'VIOLET' | 'ORANGE' | 'DARK_RED' | 'BLACK' | 'CYAN' | 'PINK' | 'WHITE' | 'LIME' | 'YELLOW';
    createdAt?: string;
    updatedAt?: string;
};

