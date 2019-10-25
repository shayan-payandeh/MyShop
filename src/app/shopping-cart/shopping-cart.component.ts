import { Component, OnInit } from '@angular/core';
import { ShoppingCartsService } from '../service/shopping-carts.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

cart$ ;
cart: ShoppingCart = new ShoppingCart(null)
  constructor(private shoppingCartService: ShoppingCartsService) {}

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product);
  }

  clearCart(){
    this.shoppingCartService.clearCart()
  }

  async ngOnInit() {

    // here cart$ is sth that we call  -LkNrcbBg_9dvHE7sAkt  in database 
    //(shopping-carts/-LkNrcbBg_9dvHE7sAkt)
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(temp => {
  
      let data: any;    
      data = temp.payload.child('/items').val();
      //(shopping-carts/-LkNrcbBg_9dvHE7sAkt/items)
      
      this.cart = new ShoppingCart(data);
      
    });
  }
  
  getQuantity(product: Product) {
    if (!this.cart) { return 0; }

    const item = this.cart.itemsMap[product.key];
    return item ? item.quantity : 0;
  }


  // getQuantity(product: Product) {
  //   if (!this.cart) { return 0; }

  //   const item = this.cart.getQuantity(product);
  //   return item ? item : 0;
  // }
 
}
