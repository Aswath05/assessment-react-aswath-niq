import { IProduct } from "../types/CategoryTypes";

export class Product {
    id: number;
    name: string;
    price: number;
    category: string;
    brand: string;

    constructor(data: IProduct) {
        this.id = data?.id,
        this.name = data?.title,
        this.price = data?.price,
        this.category = data?.category,
        this.brand = data?.brand
    }
}