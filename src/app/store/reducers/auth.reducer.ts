import * as authActions from '../actions/auth.actions'


export interface State {
    currentUser: User | null
    authError: string | null
    loading: boolean
}

export interface User {
    uid: string;
    email: string;
    incidentDirectory?: string;
    canAdmin?: boolean;
    canLicenseScan?: boolean;
    canVinScan?: boolean;
    superUser?: boolean;
    redirect?: boolean;
}

const initialState:State = {
    currentUser: null,
    authError: null,
    loading: false
}

export function reducer(state = initialState, action: authActions.AuthActions):State {
    switch(action.type) {
        case authActions.LOGIN_USER:
            return {...state, authError: null, currentUser: action.payload, loading: false}
        case authActions.LOGOUT_USER:
            return {...state, currentUser: null}
        case authActions.START_LOGIN_USER:
            return {...state, authError: null, loading: true}
        case authActions.LOGIN_FAIL:
            return {...state, currentUser: null, authError: action.payload, loading: false}
        case authActions.AUTO_LOGIN:
            return {...state, currentUser: action.payload}
        case authActions.INVALID_CREDENTIALS:
            return {...state, loading: false}
        default:
            return state
    }
}