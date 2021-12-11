import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser = {} as IUser;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      console.log('estado del usuario', user);
      if (!user) {
        return;
      }

      this.user.uid = user.uid;
      this.user.nombre = user.displayName;
      this.user.email = user.email
    })
  }

  login() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
