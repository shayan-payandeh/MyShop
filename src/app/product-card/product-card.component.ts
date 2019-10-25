import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartsService } from '../service/shopping-carts.service';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
  @Input() product: Product;
  @Input () showactions = true;
  @Input() shoppingCart: ShoppingCart ;

  constructor(private cartService: ShoppingCartsService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) { return 0; }
    let item = this.shoppingCart[this.product.key];
    return item ? item.quantity : 0;
  }

}