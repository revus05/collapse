/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from './Product';
import type { User } from './User';
export type Order = {
    uuid?: string;
    user?: User;
    products?: Array<Product>;
    createdAt?: string;
    updatedAt?: string;
};

