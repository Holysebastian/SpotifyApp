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

  logout() {
    this.user = {} as IUser;
    return this.afAuth.signOut();
  }

  register() {
    return this.afAuth.createUserWithEmailAndPassword('Holysebastian3@gmail.com', '123456')
     .then (user => {
        console.log('se creo usuario', user);
      }).catch(errorUser => {
        console.log('errorUser', errorUser)
      }).catch(error => {
        console.log('errorUser2', error)
      })
  }
        

 

  login() {
   return this.afAuth.signInWithEmailAndPassword('Holysebastian3@gmail.com', '123456')
     .then(login => {
        console.log(login)
      })
      .catch(error => {
      console.log('errorLogin', error)
      });
    }
  }