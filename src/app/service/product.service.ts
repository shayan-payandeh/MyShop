import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private database : AngularFireDatabase) { }

  create(product){
    return this.database.list('/produts').push(product)
  }

  getAll() {
    return this.database.list('/produts')
    .snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }


  get(productId){
    return this.database.object('/produts/' + productId)
  }

  update(productId , product){
    return this.database.object('/produts/' + productId).update(product)  
  }

  delete(productId){
    return this.database.object('/produts/' + productId).remove()
  }
}
