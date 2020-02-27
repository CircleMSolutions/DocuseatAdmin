import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { NgForm } from '@angular/forms'
import * as firebase from 'firebase/app'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-setclaims',
  templateUrl: './setclaims.component.html',
  styleUrls: ['./setclaims.component.scss']
})
export class SetclaimsComponent implements OnInit {

  isSetting: boolean = false;
  message: string = ''

  form = this.fb.group({
    email: [''],
    directory: [''],
    canAdmin: [''],
    canLicenseScan: [''],
    canVinScan: ['']
  })

  constructor(private core: CoreService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  setClaims(form: NgForm) {
    this.message = ''
    this.isSetting = true
    if (form.value.username !== '' && form.value.directory !== '0') {
      let payload = {
        email: form.value.username,
        newClaims: {
          incidentDirectory: form.value.directory,
          canAdmin: form.value.canAdmin,
          canLicenseScan: form.value.canLicenseScan,
          canVinScan: form.value.canVinScan
        }
      }
      firebase.functions().httpsCallable('setClaims')({payload})
        .then(result => {
          this.isSetting = false
          this.message = result.data
        })
        .catch(err => {
          this.isSetting = false;
          return this.message = err
        })
    } else {
      this.isSetting = false;
      this.message = 'Insufficient information'
    }
  }

  getClaims(username: string) {
    this.isSetting = true;
    firebase.functions().httpsCallable('getClaims')({email: username})
      .then(claims => {
        console.log(claims)
        this.form.patchValue({
          email: username,
          directory: claims.data.incidentDirectory,
        })
        // this.form.cont
        // this.scUser = claims.data
        // const dirIndex = this.directories.indexOf(claims.data.incidentDirectory)
        // this.scUser.dirIndex = dirIndex > -1 ? dirIndex + 1 : 0
        // this.scUser.email = username
        this.isSetting = false;
      })
      .catch(err => {
        this.isSetting = false
      })
  }
}
