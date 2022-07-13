import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  cartOrder: Order = new Order;
  products: Product[] = [];
  cartEmpty: boolean = true;

  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  address: string = "";
  ccn: string = "";

  constructor(private orderService: OrderService, private router: Router) { }

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
      // console.log(this.products[i].name)
      let amt = (<HTMLInputElement>document.getElementById(`amtFor${this.products[i].id}`)).value as unknown as number;
      sum += this.products[i].price * amt

      if (amt == 0) {
        this.removeProduct(this.products[i])
        i--;
      }
    }
    this.subtotal = Math.round(sum * 100)/100;
    this.tax = Math.round(this.subtotal * 0.08 * 100)/100;
    this.total = Math.round(this.subtotal + this.tax + 5.00 * 100)/100;
  }

  removeProduct(product: Product): void {
    // remove from products
    this.products = this.products.filter(p => p != product)
    // remove from order
    this.cartOrder.products.delete(product)
    alert("Removed from Cart")
  }

  submitOrder(): void {
    this.cartOrder.totalCost = this.total;
    this.router.navigateByUrl('/order-success/1')
  }

}
