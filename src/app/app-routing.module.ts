import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path : '' ,component : ProductsComponent},
    { path : 'login' ,component :LoginComponent},
    { path : 'products' ,component :ProductsComponent},
    { path : 'my/orders' ,component :MyOrderComponent, canActivate:[AuthGuardService]},
    { path : 'shopping-cart' ,component :ShoppingCartComponent ,},
    { path : 'check-out' ,component : CheckOutComponent , canActivate:[AuthGuardService]},
    { path : 'order-success/:id' ,component :OrderSuccessComponent , canActivate:[AuthGuardService]},
    
    { path : 'admin/orders' ,component :AdminOrdersComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},

    { path : 'admin/products/new' ,component :ProductFormComponent , canActivate:[AuthGuardService,AdminAuthGuardService]},
    { path : 'admin/products/:id' ,component :ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
    { path : 'admin/products' ,component :AdminProductComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
