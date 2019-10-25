import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { async } from '@angular/core/testing';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartsService {

  constructor(private database: AngularFireDatabase) {}

  private create(){
    return this.database.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    })
  } 

  // we need Id of cart 
  //check if there is shopping-carts/cartId (in this case : shopping-carts/-LkNrcbBg_9dvHE7sAkt)
  // and return it , if not create one and return the key of ii
  private async getOrCreateCartId(){
    let cartId = localStorage.getItem("cartId");
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId",result.key)
    return result.key
  }
  
  private getItem(cartId : string ,productId : string){
    return this.database.object("/shopping-carts/" + cartId + "/items/" + productId)
  }

  private async updateItem(product : Product ,change : number){
   let cartId = await this.getOrCreateCartId();

   let item$ = this.getItem(cartId,product.key);

   item$.snapshotChanges().pipe(take(1)).subscribe(item =>{
     let quantity = (item.payload.child('/quantity').val() || 0) + change ;
     if(quantity === 0) item$.remove();
     else
     item$.update({
      // product : product , 
      title : product.title,
      price : product.price,
      imageUrl: product.imageUrl,
      quantity: quantity
   })
   })}

  async addToCart(product : Product){
    this.updateItem(product, 1)
    }
  
     removeFromCart(product : Product){
     this.updateItem(product , -1)
    }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.database.object('/shopping-carts/' + cartId + '/items').remove()
  }

    async getCart(){
      let cartId = await this.getOrCreateCartId()
      return this.database.object("/shopping-carts/" + cartId).snapshotChanges()
    } //read a cart in firebase database which belongs to one user
  
  
}
