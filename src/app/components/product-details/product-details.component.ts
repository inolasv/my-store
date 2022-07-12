import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  id: Number;

  constructor(private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService) {
    this.product = {
      id: 0,
      name: "",
      price: 0,
      url: "",
      description: ""
    }
    this.id = 0;
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = Number(params.get('id'));
      this.product = this.productService.getProducts().find(p => p.id == this.id) as Product
    });
  }

  addToCart(): void {
    let inputNum = Number((<HTMLInputElement>document.getElementById(`amtFor${this.product.id}`)).value);
    this.orderService.addToOrder(1, this.product, inputNum);
    alert(`Added ${inputNum} of ${this.product.name} to cart!`);
  }

}
