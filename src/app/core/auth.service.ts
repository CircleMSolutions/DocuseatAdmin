import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'firebase';
import { map, take } from 'rxjs/operators';
import { AppState } from '../store/reducers';
import * as fromAuth from '../store/actions/auth.actions'
import { Store } from '@ngrx/store'
import * as firebase from 'firebase/app'
import 'firebase/functions'

export interface IClaims {
  superUser?: boolean;
  canAdmin?: boolean;
  incidentDirectory?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>
  claims$: Observable<IClaims>

  constructor(private afAuth: AngularFireAuth, private router: Router, private store: Store<AppState>) {
    this.user$ = this.afAuth.authState
    this.claims$ = this.afAuth.idTokenResult.pipe(
      map(token => token.claims)
    )
   }

   login(uid:string, pwd:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(uid, pwd)
   }

   loginClaims(uid: string, pwd) {
     return this.afAuth.auth.signInWithEmailAndPassword(uid, pwd)
      .then(user => user.user.getIdTokenResult())
   }

   signOut(redirect: boolean)
   {
    this.afAuth.auth.signOut()
      .then(_ => {
        this.store.dispatch(new fromAuth.LogoutUser())
        if (redirect) {
          this.router.navigate(['']);
        }
      }) 
   }

   resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
   }
}


