import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Observable, Subscription } from 'rxjs';
import { map} from 'rxjs/operators';
import { DataTableResource } from 'angular5-data-table';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit , OnDestroy {
products : Product[];
filteredProducts : Product[];
subscription : Subscription;

  constructor(private productService : ProductService) {
    this.subscription = this.productService.getAll().subscribe(products =>{
      const temp : any[] = products;
      this.products = temp;

       
    })
  }
 
  filter(query:string){
    //product should be filtered according to the query that we type in search input
    this.products = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
    }
    

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  ngOnInit() {
  }

}
