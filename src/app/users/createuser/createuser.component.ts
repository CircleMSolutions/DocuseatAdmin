import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';

interface IAsyncState {
  isSetting: boolean, 
  message: string
}

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  createState$: BehaviorSubject<IAsyncState> = new BehaviorSubject({isSetting: false, message: ''})
  

  constructor(private core: CoreService) { }

  ngOnInit() {
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
