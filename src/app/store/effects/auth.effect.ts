import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from '../actions/auth.actions'
import { switchMap, catchError, map, tap } from 'rxjs/operators'
import { AuthService } from 'src/app/core/auth.service'
import { from, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffects {

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.START_LOGIN_USER),
        switchMap((authData: AuthActions.StartLoginUser) => {
            return from(this.afAuth.loginClaims(authData.payload.user, authData.payload.pwd)).pipe(
                map(resData => {
                    if(resData.claims.superUser) {
                        return new AuthActions.LoginUser({
                            uid: resData.claims.uid,
                            email: resData.claims.email,
                            canAdmin: resData.claims.canAdmin,
                            superUser: resData.claims.superUser,
                            redirect: true
                        })
                    } else {
                        this.afAuth.signOut(false) // false prevents redirect
                        return new AuthActions.LoginFail('User does not have proper credentials')
                    }
                }),
                catchError(err => {
                    return of(new AuthActions.LoginFail(err.message))
                })
            )
        })
    )
    
    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN_USER),
        tap((userInfo:AuthActions.LoginUser) => {
            if (userInfo.payload.redirect) {
                this.router.navigate(['mainmenu'])
            }
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        switchMap((userData: AuthActions.AutoLogin) => {
            return of(new AuthActions.LoginUser({...userData.payload}))
        })
    )

    constructor(
        private actions$: Actions, 
        private afAuth: AuthService, 
        private router: Router
    ) {}
}