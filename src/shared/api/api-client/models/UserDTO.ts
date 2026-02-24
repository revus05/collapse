/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

