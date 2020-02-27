import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/actions/auth.actions'
import { AppState } from '../store/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login$: Subscription
  loading: boolean = false;
  message: string

  constructor(public auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.login$ = this.store.select('auth').subscribe(authState => {
      this.loading = authState.loading
      this.message = authState.authError
    })
  }

  ngOnDestroy(): void {
    this.login$.unsubscribe()
  }

  login(user: string, pwd: string) {
    this.store.dispatch(new AuthActions.StartLoginUser({user: user, pwd: pwd}))
  }
}
