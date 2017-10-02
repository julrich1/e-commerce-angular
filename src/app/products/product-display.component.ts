import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Product } from "./product";

import { ProductService } from "./product.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'product-display',
  templateUrl: './product-display.component.html',
  // styleUrls: ['./app.component.css']
})
export class ProductDisplayComponent implements OnInit {
  private product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,    
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProduct(+params.get("id")))
      .subscribe(product => this.product = product);
  }

  add(product): void {
    this.productService.addToCart(product).then(() => {
      //Do something?
    });
  }
}