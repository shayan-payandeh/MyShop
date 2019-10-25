import { Component, OnInit , Input} from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories:Observable<any>;
  @Input() category ;
  constructor(private getCategories:CategoryService) {
    this.categories = this.getCategories.getCategories();
   }

  ngOnInit() {
  }

}
