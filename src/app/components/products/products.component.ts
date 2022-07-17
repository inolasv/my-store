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

  showAlert: boolean = false;
  itemAdded: string = "";

  constructor(private product_service: ProductService) { }

  ngOnInit(): void {

    this.product_service.getProducts().subscribe(res => {
      this.product_list = res;
    });

  }

  addToCart(product: Product): Product {
    this.itemAdded = product.name;
    this.showAlert = true;
    console.log(product.name)
    window.scrollTo(0, 0);

    return product;
  }

}
