import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  cartOrder: Order = new Order;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let orderId = this.route.snapshot.paramMap.get('id') as unknown as number
    // console.log(orderId);
    this.cartOrder = this.orderService.orders.find(o => o.id == orderId) as Order
  }
}