import { Product } from "./Product";

export class Order {
    id: number;
    products = new Map<Product, number>();

    constructor() {
        this.id = 0;
        this.products;
    }

}
