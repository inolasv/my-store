import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[];


  constructor() {
    this.orders = []
   }

  addToOrder(id: number, product: Product, amt: number): void {
    let order = this.orders.find(o => o.id==id)
    if(order == undefined) {
      this.orders.push({
        id: id,
        products: new Map<Product, number>()
      });
      order = this.orders.find(o => o.id==id) as Order;
    }

    let hasKey = false;

    for (const [key, value] of order.products) {
      if (typeof key === 'object' && key.id === product.id) {
        hasKey = true;
        break;
      }
    }

    if (hasKey) {
      console.log(`Adding ${amt} to already created ${product.name}`)
      let newAmt: number = order.products.get(product) as number + amt;
      order.products.set(product, newAmt);
    } else {
      console.log(`Adding ${amt} to a NEW ${product.name}`)
      order.products.set(product, amt);
    }
    console.log(order)
  }
}
