/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItemDTO } from './CartItemDTO';
export type OrderDTO = {
    /**
     * Order uuid
     */
    uuid: string;
    /**
     * Cart items list
     */
    orderItems: Array<CartItemDTO>;
    /**
     * Total order price
     */
    totalAmount: number;
    /**
     * Order currency
     */
    currency: 'BYN' | 'RUB';
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

