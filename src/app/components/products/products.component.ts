import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  title: string = "Products";
  product_list: Product[] = []

  constructor(private product_service: ProductService) { }

  ngOnInit(): void {

    this.product_service.getProducts().subscribe(res => {
      this.product_list = res;
    });

  }

}
