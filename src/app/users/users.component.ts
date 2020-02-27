import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../store/reducers/auth.reducer';
import * as firebase from 'firebase/app'
import 'firebase/functions'
import { NgForm } from '@angular/forms'
import { AuthService } from '../core/auth.service';

interface CCUser extends User {
  dirIndex: number;
}

interface IAsyncState {
  isSetting: boolean, 
  message: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = []
  directories = ['vestaviaHillsFD', 'myIncidents', 'myIncidentsPortal']
  getClaims$: Observable<any>
  gcMessage: string
  scMessage: string
  scUser: CCUser
  isSetting: boolean
  createState$: BehaviorSubject<IAsyncState> = new BehaviorSubject({isSetting: false, message: ''})

  constructor(private core: AuthService) { }

  ngOnInit(): void {
    firebase.functions().httpsCallable('getUserList')({})
      .then(users => this.users = users.data)
  }

  setClaims(username: string, directory: string, canAdmin:boolean, canLicenseScan:boolean, canVinScan:boolean) {
    event.preventDefault()
    this.scMessage = ''
    this.isSetting = true
    if (username !== '' && directory !== '0') {
      let payload = {
        email: username,
        newClaims: {
          incidentDirectory: directory,
          canAdmin: canAdmin,
          canLicenseScan: canLicenseScan,
          canVinScan: canVinScan
        }
      }
      firebase.functions().httpsCallable('setClaims')({payload})
        .then(result => {
          this.isSetting = false
          this.scMessage = result.data
        })
        .catch(err => {
          this.isSetting = false;
          return this.scMessage = err
        })
    } else {
      this.isSetting = false;
      this.scMessage = 'Insufficient information'
    }
  }

  getClaims(username: string) {
    event.preventDefault()
    this.isSetting = true;
    firebase.functions().httpsCallable('getClaims')({email: username})
      .then(claims => {
        this.scUser = claims.data
        const dirIndex = this.directories.indexOf(claims.data.incidentDirectory)
        this.scUser.dirIndex = dirIndex > -1 ? dirIndex + 1 : 0
        this.scUser.email = username
        this.isSetting = false;
      })
      .catch(err => {
        this.isSetting = false
        this.gcMessage = err
      })
  }

  createUser(form: NgForm) {
    this.createState$.next({isSetting: true, message: ''})
    if (form.value.pwd !== form.value.confirmpwd) {
      this.createState$.next({isSetting: false, message: 'Confirm password does not match'})
      return
    }
    this.core.createUser(form.value.email, form.value.pwd)
    .then(result => {
      this.createState$.next({isSetting: false, message: result})
    })
    .catch(error => {
      this.createState$.next({isSetting: false, message: 'Unhandled Error'})
        console.log(error)
      })
  }
}
