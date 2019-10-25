import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartsService } from '../service/shopping-carts.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input() product: Product;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartsService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) { return 0; }
    // console.log(this.shoppingCart);
    const item = this.shoppingCart[this.product.key];
    return item ? item.quantity : 0;
  }

}
