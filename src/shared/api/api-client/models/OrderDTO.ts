/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItemDTO } from './CartItemDTO';
import type { OrderStatus } from './OrderStatus';
import type { UserDTO } from './UserDTO';
export type OrderDTO = {
    /**
     * Order uuid
     */
    uuid: string;
    /**
     * Customer
     */
    user: UserDTO;
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
     * Order status
     */
    status: OrderStatus;
    /**
     * Delivery phone
     */
    phone: string;
    /**
     * Delivery address
     */
    address: string;
    /**
     * Order comment
     */
    comment?: string | null;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};
