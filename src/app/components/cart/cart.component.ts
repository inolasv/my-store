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

  title: string = "cart";
  cartOrder: Order = {
    id: 0,
    products: new Map<Product, number>()
  };
  products: Product[] = [];
  cartEmpty: boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    let order = this.orderService.orders.find(o => o.id == 1);
    if (order != undefined) {
      this.cartEmpty = false;
      this.cartOrder = order;
    }
    this.products = [ ...this.cartOrder.products.keys() ];
  }

}
