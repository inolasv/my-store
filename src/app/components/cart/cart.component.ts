import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  cartOrder: Order = {
    id: 0,
    products: new Map<Product, number>()
  };
  products: Product[] = [];
  cartEmpty: boolean = true;

  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    let order = this.orderService.orders.find(o => o.id == 1);
    if (order != undefined) {
      this.cartEmpty = false;
      this.cartOrder = order;
    }
    this.products = [ ...this.cartOrder.products.keys() ];

    this.subtotal = Math.round(this.findTotalPrice() * 100)/100;
    this.tax = Math.round(this.subtotal * 0.08 * 100)/100;
    this.total = Math.round(this.subtotal + this.tax + 5.00 * 100)/100;

  }
  

  findTotalPrice(): number {
    let sum = 0;
    for (let i = 0; i < this.products.length; i++) {
      let amt = this.cartOrder.products.get(this.products[i]) as number
      sum += this.products[i].price * amt;
    }  
    return sum;
  }

  updateTotalPrice(): void {
    let sum = 0;
    for (let i = 0; i < this.products.length; i++) {
      let amt = (<HTMLInputElement>document.getElementById(`amtFor${this.products[i].id}`)).value as unknown as number;
      if (amt == 0) {
        // remove product from order
        continue;
      }
      sum += this.products[i].price * amt
    }
    this.subtotal = Math.round(sum * 100)/100;
    this.tax = Math.round(this.subtotal * 0.08 * 100)/100;
    this.total = Math.round(this.subtotal + this.tax + 5.00 * 100)/100;
  }

}
