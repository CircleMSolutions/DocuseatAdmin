import { Action } from '@ngrx/store'
import { User } from '../reducers/auth.reducer'

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const START_LOGIN_USER = 'START_LOGIN_USER';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';

export class LoginUser implements Action {
    readonly type = LOGIN_USER;
    
    constructor(public payload: User) {}
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER;
}

export class StartLoginUser implements Action {
    readonly type = START_LOGIN_USER;

    constructor(public payload: {user: string, pwd:string}) { }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL

    constructor(public payload: string) {}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN

    constructor(public payload: User) {}
}

export class InvalidCredentials implements Action {
    readonly type = INVALID_CREDENTIALS

    constructor(public payload: string) {}
}

export type AuthActions = LoginUser | LogoutUser | StartLoginUser | LoginFail | AutoLogin | InvalidCredentials