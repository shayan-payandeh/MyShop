import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartsService } from './shopping-carts.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private database : AngularFireDatabase , private shoppingCartService : ShoppingCartsService) {
   }

   async placeOrder(order){
     let result = await this.database.list('/order').push(order)
     this.shoppingCartService.clearCart();
     return result;
  }
}
