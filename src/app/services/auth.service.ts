import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { first, switchMap } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './models/user.model';
import firebase from "firebase/compat/app"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  constructor(public auth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) 
  {
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.doc<User>('users/' + user.uid).valueChanges();
        }
        else{
          return of(null);
        }
      })
    );
    
  } 
  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider;
    const credential = await this.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
  async signOut(){
    await this.auth.signOut();
    return this.router.navigate(['/']);
  }
  private updateUserData(user: any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/' + user.uid );
    const data = {
      UID: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    return userRef.set(data, {merge: true});
  }
  public currentUser = this.auth.currentUser;
}
