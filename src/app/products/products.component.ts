import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Observable, Subscription } from 'rxjs';
import { map,switchMap } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartsService } from '../service/shopping-carts.service';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnDestroy  {
products:Product[] =[];
category:string;
filteredProducts :Product[];
cart : ShoppingCart;
subscription : Subscription;
  constructor(private productService : ProductService ,
              private route : ActivatedRoute,
              private shoppingCartService : ShoppingCartsService) 
  { 
    this.productService.getAll().subscribe(products => {
          let temp: any[];
          temp = products;
          this.products = temp;
    
          this.route.queryParamMap.subscribe(params => {
            this.category = params.get('category');
            this.filteredProducts = (this.category) ?
              this.products.filter(p => p.category === this.category) : 
              this.products;
          });
    
        });
    
       
  //   this.productService.getAll()
  // .pipe(switchMap( products => {
  //   let temp: any[];
  //   temp = products;
  //   this.products = temp; 
  //   return this.route.queryParamMap;
  //   }))
  //   .subscribe(params => {
  //     this.category = params.get('category');
  //     // console.log(this.category)
  //     this.filteredProducts = (this.category) ?
  //       this.products.filter(p => p.category === this.category) : 
  //       this.products;
  //       //console.log(this.filteredProducts)
  //   }); 
  
   }

   async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => {
      let temp: any;
      temp = cart.payload.child('/items').val();
      this.cart = temp
      
  })
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}


}

  


