import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$ :Observable<firebase.User>
  
  constructor(private afAuth : AngularFireAuth,
              private route : ActivatedRoute,
              private userService : UserService) { 
    this.user$ = this.afAuth.authState;
    // authState(which is an observable) represnts authentication state of user
    // user$ must be unsbscribed via onDestroy or unwrapped  using async in template
  }

  login(){
    // before a user signs in ,we want to save the url
    // (the url that user wanted to access before signing in)
    // into localstorage of browser
    let urlReturn = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',urlReturn)
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logout(){ 
    this.afAuth.auth.signOut()
  }

//
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) 
          {return this.userService.get(user.uid).valueChanges();} 

        else {return of(null);}
        
      })
      );
    }
}
