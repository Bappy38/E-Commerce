export interface iProduct{
    Id: string;
    SL: number;
    Name: string;
    Category: string;
    SubCategory: string;
    Price: number;
    OldPrice?:number,
    Unit: string;
    Quantity: number;
    Image: string;
    Description: string;
    Rating: number;
}