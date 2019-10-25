import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderService } from '../service/order.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit , OnDestroy {
@Input() cart ;
shipping = {};
authSubscription : Subscription;
userId;
  constructor(
    private orderService : OrderService,
    private authService : AuthService ,         
    private router : Router
     ) { }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)

  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  async placeOrder(){
    let order = new Order(this.userId , this.shipping , this.cart);
    let result = await this.orderService.placeOrder(order)
    this.router.navigate(['/order-success',result.key])
  }
}
