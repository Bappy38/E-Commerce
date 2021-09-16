import { iProduct } from "src/app/shared/model/iProduct";

export interface iUserCart
{
    id: string;
    UserName: string;
    orderedProductList: iProduct[];
}