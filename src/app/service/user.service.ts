import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
// this service is used for creating and retrieving a user in firebase database
export class UserService {
  constructor(private database : AngularFireDatabase) { }

  //once user is logged in , a user would be created in firebase database
  save(user : firebase.User){
     this.database.object('/users/' + user.uid).set({
       name : user.displayName,
       email : user.email,
       isAdmin : true
       
     })
  
    }

  
  get(uid : string):AngularFireObject<AppUser>{
    return this.database.object('/users/' + uid)
  }

}

