import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
categories$;
product = {};
pro;
id;
  constructor(
    private route : ActivatedRoute, 
    private router : Router,
    private categorySevice : CategoryService,
    private productService : ProductService) 
    {
    this.categories$ = this.categorySevice.getCategories();
   this.id = this.route.snapshot.paramMap.get('id');  

   // this condition is for those who comes from admin/product page and clicks Edit link

   if (this.id)
        {
          this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p =>{
            this.product = p
          })
        
        }
    
  }

  save(pro){
    //check if there is a product then instead of calling create method , call update method 
    if(this.id){
      this.productService.update(this.id,pro)
    }

    // otherwise we wnat to create a product .
    else{this.productService.create(pro);}
    
    // after creating a product , back to '/admin/products' route.
    this.router.navigate(['/admin/products'])
  }

  delete(){
    if(!confirm('Are you sure you want to delete the product ?'))return;

    this.productService.delete(this.id)
    this.router.navigate(['/admin/products'])
  }

  ngOnInit() {}
  
}
