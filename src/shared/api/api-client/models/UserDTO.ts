/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from './Order';
import type { ProductDTO } from './ProductDTO';
export type UserDTO = {
    /**
     * User uuid
     */
    uuid: string;
    /**
     * User image URL
     */
    image: string;
    /**
     * FirstName
     */
    firstName: string;
    /**
     * LastName
     */
    lastName: string;
    /**
     * MiddleName
     */
    middleName: string;
    /**
     * Email address
     */
    email: string;
    /**
     * Phone number
     */
    phone: string;
    /**
     * Preferred currency
     */
    currency: 'BYN' | 'RUB';
    /**
     * User role
     */
    role: 'USER' | 'ADMIN';
    /**
     * User orders
     */
    orders: Array<Order>;
    /**
     * User cart
     */
    cart: Array<ProductDTO>;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

