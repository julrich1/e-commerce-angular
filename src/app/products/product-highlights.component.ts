import { Component, OnInit } from '@angular/core';

import { Product } from "./product"

import { ProductService } from "./product.service";

@Component({
  selector: 'product-highlights',
  templateUrl: './product-highlights.component.html',
  styleUrls: ['./product-highlights.component.css']
})
export class ProductHighlightsComponent implements OnInit {
  products: Array<Product> = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getHighlightProducts();
  }
}