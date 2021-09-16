import { iProduct } from "./iProduct";

export interface iOrder{
    id: string,
    OrderNo: string,
    UserName: string,
    Address: string,
    Contact: string,
    OrderDate: string,
    OrderStatus: string,
    OrderedProductList: iProduct,
    TotalCost: number
} 