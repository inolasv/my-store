import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
    
  constructor(private orderService: OrderService) {

    this.product = {
      id: 0,
      name: "",
      price: 0,
      url: "",
      description: ""
    }
    
    
   }

  ngOnInit(): void {

  }

  addToCart(): void {
    // add to cart how?
    // create a new order, we have the model created
    // have a service that does this? or a order component?
    let inputNum = Number((<HTMLInputElement>document.getElementById(`amtFor${this.product.id}`)).value);
    this.orderService.addToOrder(1, this.product, inputNum);
    // console.log(`Added ${inputNum} of ${this.product.name} to order!`);
  }

}
