import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartsService } from '../service/shopping-carts.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../service/order.service';
import { AuthService } from '../service/auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit , OnDestroy {

cart :ShoppingCart;
cartSubscription : Subscription;

  constructor(private shoppingCartService : ShoppingCartsService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart =>{
      let temp : any
      temp = cart.payload.child('/items').val();
      this.cart = new ShoppingCart(temp)
    })
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

 
}
