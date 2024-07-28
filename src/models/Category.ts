import { ICategory } from "../types/CategoryTypes";

export class Category {
    id: string;
    name: string;
    url: string;

    constructor(category: ICategory) {
        this.id = category.slug,
        this.name = category.name,
        this.url = category.url 
    }
}