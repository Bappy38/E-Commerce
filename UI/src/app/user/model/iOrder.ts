import { iProduct } from "./iProduct";

export interface iOrder{
    id: string,
    OrderNo: string,
    UserName: string,
    Address: string,
    Contact: string,
    OrderedProductList: iProduct,
    TotalCost: number
} 