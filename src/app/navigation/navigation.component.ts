import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartsService } from '../service/shopping-carts.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
appUser :AppUser ;
shoppingCartItemCount:number;
  constructor(private auth : AuthService ,
              private shoppingCartService : ShoppingCartsService) {}
async ngOnInit(){
  this.auth.appUser$.subscribe(user => this.appUser = user)

 let cart$ = await this.shoppingCartService.getCart();
 cart$.subscribe(temp =>{
   let cart :ShoppingCart ;
  let data :any;
  //data = temp.payload.child('/items').val();
  data = temp.payload.val();
  cart = data;
  this.shoppingCartItemCount = 0;
  for (let productId in cart.items) {
    this.shoppingCartItemCount += cart.items[productId].quantity;
  }
 })
}

logout(){
  this.auth.logout()
}
}
