import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  id: Number;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
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

}