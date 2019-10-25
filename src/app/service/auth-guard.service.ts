import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth : AuthService, private router : Router) { }

  //canActivate method returns true or false
  canActivate(router,state){
    return this.auth.user$.pipe(map(user =>{
     if(user) return true;
     else{ this.router.navigate(['/login'], {queryParams:{returnUrl : state.url}}); return false;}
     
   }))
  }
}
