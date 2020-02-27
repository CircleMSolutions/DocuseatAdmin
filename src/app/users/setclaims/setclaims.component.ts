import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { NgForm } from '@angular/forms'
import * as firebase from 'firebase/app'
import { FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setclaims',
  templateUrl: './setclaims.component.html',
  styleUrls: ['./setclaims.component.scss']
})
export class SetclaimsComponent implements OnInit, OnDestroy {

  isSetting: boolean = false;
  message: string = ''
  event$: Subscription

  form = this.fb.group({
    email: [''],
    directory: [''],
    canAdmin: [''],
    canLicenseScan: [''],
    canVinScan: ['']
  })

  constructor(private core: CoreService, private fb: FormBuilder) { }

  ngOnInit() {
    this.event$ = this.core.userCompEvent.subscribe(e => {
      if (e.type === 'getclaims') {
        this.getClaims(e.payload)
      }
    })
  }

  ngOnDestroy() {
    this.event$.unsubscribe()
  }

  setClaims() {
    this.message = ''
    this.isSetting = true
    if (this.form.get('email').value !== '') {
      let payload = {
        email: this.form.get('email').value,
        newClaims: {
          incidentDirectory: this.form.get('directory').value,
          canAdmin: this.form.get('canAdmin').value,
          canLicenseScan: this.form.get('canLicenseScan').value,
          canVinScan: this.form.get('canVinScan').value
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
          canAdmin: claims.data.canAdmin,
          canLicenseScan: claims.data.canLicenseScan,
          canVinScan: claims.data.canVinScan
        })
        this.isSetting = false;
      })
      .catch(err => {
        console.log(err)
        this.isSetting = false
      })
  }
}
