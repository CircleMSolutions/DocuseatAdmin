import { Component, OnInit, EventEmitter, Output } from '@angular/core';

export interface ComponentEvent {
  type: string;
  payload: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  } 
}
