/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from './Order';
import type { Product } from './Product';
export type User = {
    uuid?: string;
    image?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    phone?: string;
    password?: string;
    currency?: 'BYN' | 'RUB';
    role?: 'USER' | 'ADMIN';
    orders?: Array<Order>;
    cart?: Array<Product>;
    createdAt?: string;
    updatedAt?: string;
};

