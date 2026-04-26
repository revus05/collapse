/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrderRequestDTO = {
    /**
     * Cart items list
     */
    orderItemsUuids: Array<string>;
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
    comment?: string;
};
