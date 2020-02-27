import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../core/auth.service';
import * as fromApp from '../store/reducers';
import * as fromAuth from '../store/reducers/auth.reducer';
import * as AuthActions from '../store/actions/auth.actions'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('logoutModal', {static: false}) logoutModal: ElementRef
  uid$: Observable<fromAuth.User>

  constructor(public auth: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.uid$ = this.store.select('auth').pipe(
      map(appState => appState.currentUser)
    )
  }

  showLogoutModal() {
    this.logoutModal.nativeElement.modal('show')
  }

  signOut() {
    this.auth.signOut(true) //true causes redirect to login page
  }

  test() {
    this.store.dispatch(new AuthActions.LoginUser({uid: '1123', email: 'new@me.com'}))
  }

}
