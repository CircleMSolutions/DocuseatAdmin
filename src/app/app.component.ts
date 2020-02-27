import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import * as AuthActions from './store/actions/auth.actions'
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { User } from './store/reducers/auth.reducer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'docuseatAdmin';

  constructor(private store: Store<AppState>, private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.auth.authState.pipe(first()).toPromise()
      .then(result => {
        result.getIdTokenResult()
          .then(token => {
            if(token !== null) {
              const redirect = this.router.url === '/' || this.router.url === '/login'
              let u:User = {
                uid: result.uid,
                email: result.email,
                superUser: token.claims.superUser,
                redirect: redirect
              }
              this.store.dispatch(new AuthActions.AutoLogin(u))
            }
          })
      })
      .catch(console.log)
  }
}
