import { Product } from './product';

export class ShoppingCartItem {
   key: string;
   imageUrl: string;
   title : string;
   price : number;
   quantity: number;
   //constructor(public product: Product, public quantity: number) {}
   get totalPrice(){
           return this.price * this.quantity;
   }
}