import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
              private userService :UserService , 
              private auth : AuthService ,
              private  router : Router){
    this.auth.user$.subscribe(user=>{
      if(user){
        this.userService.save(user);
        
        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl){
          localStorage.removeItem('returnUrl')
          this.router.navigateByUrl(returnUrl)
      }
        
      }
    })
  }

}
