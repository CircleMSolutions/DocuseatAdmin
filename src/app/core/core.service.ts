import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { Subject } from 'rxjs';

export interface UserComponentEvent {
  type: string;
  payload: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  userCompEvent: Subject<UserComponentEvent> = new Subject()

  constructor() { }

  createUser(email: string, pwd: string) {
    return firebase.functions().httpsCallable('createUser')({
      email: email,
      password: pwd
    })
    .then(result => {
      const msg = result.data.errorInfo ? result.data.errorInfo.message : result.data
      return msg
    })
    .catch(error => {
        return error
    })
   }

   getUserList() {
    return firebase.functions().httpsCallable('getUserList')({})
   }
}
