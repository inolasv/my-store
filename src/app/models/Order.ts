import { Product } from "./Product";

export class Order {
    id: number;
    products = new Map<Product, number>();
    name: string;
    totalCost: number;

    constructor() {
        this.id = 0;
        this.products;
        this.name = "";
        this.totalCost = 0;
    }

}
