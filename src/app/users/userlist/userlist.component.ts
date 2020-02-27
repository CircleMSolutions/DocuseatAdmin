import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {
  
  isSetting:boolean = false;
  users = []
  event$: Subscription
  
  constructor(private core: CoreService) { }
  
  ngOnInit() {
    this.refreshList()
    this.event$ = this.core.userCompEvent.subscribe(e => {
      if(e.type === 'created') {
        this.refreshList()
      }
    })
  }
  
  ngOnDestroy(): void {
    this.event$.unsubscribe()
  }

  refreshList() {
    this.core.getUserList()
      .then(users => this.users = users.data)
  }
}
