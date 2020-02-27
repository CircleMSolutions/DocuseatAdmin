import { Component, OnInit } from '@angular/core';
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

  isSetting: boolean = false
  message: string = ''

  constructor(private core: CoreService) { }

  ngOnInit() {
  }

  createUser(form: NgForm) {
    this.message = ''
    this.isSetting = true
    if (form.value.pwd !== form.value.confirmpwd) {
      this.isSetting = false
      this.message = 'Confirm password does not match'
      return
    }
    this.core.createUser(form.value.email, form.value.pwd)
    .then((result: string) => {
      this.isSetting = false
      this.message = result
      if(result.endsWith('successfully')) {
        this.core.userCompEvent.next({type: 'created', payload: ''})
      }
    })
    .catch(error => {
      this.isSetting = false
      this.message = 'Unhandled Error'
        console.log(error)
      })
  }

}
