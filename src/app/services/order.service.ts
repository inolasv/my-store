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

    for (let [key, value] of order.products) {
      if (typeof key === 'object' && key.id === product.id) {
        console.log(`Adding ${amt} to already created ${product.name}`)
        hasKey = true;
        order.products.set(key, value + amt);
        break;
      }
    }
    if (!hasKey) {
      console.log(`Adding ${amt} to a NEW ${product.name}`)
      order.products.set(product, amt);
    }

    // if (hasKey) {
    //   console.log(`Adding ${amt} to already created ${product.name}`)
    //   // let oldAmt = order.products.get(product)
    //   if (oldAmt == undefined) {
    //     console.log("not a number buddy.")
    //   } else {
    //     let newAmt = oldAmt + amt;
    //     order.products.set(product, newAmt as number);
    //   }
      
    // } else {
    //   console.log(`Adding ${amt} to a NEW ${product.name}`)
    //   order.products.set(product, amt);
    // }
    // console.log(order)
  }
  
}
