import { iProduct } from "./iProduct";

export interface iUserCart
{
    id: string;
    UserName: string;
    orderedProductList: iProduct[];
}