import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { map } from 'rxjs/operators';

interface IMessage {
  date: firebase.firestore.Timestamp;
  message: string;
  id?: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages$: Observable<IMessage[]>
  // @ViewChild('confirmModal') confirmModal: ElementRef
  displayedColumns = ['date', 'message', 'delete']
  selectedRow: IMessage | null
  @ViewChild('message', {static: false}) message: ElementRef

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.messages$ = this.db.collection<IMessage>('docuseatMessages', ref => ref.orderBy('date','asc')).snapshotChanges().pipe(
      map(documents => {
        return documents.map(doc => {
          return {id: doc.payload.doc.id, message: doc.payload.doc.data().message, date: doc.payload.doc.data().date}
        })
      })
    )
  }

  deleteClicked(row: IMessage) {
    this.selectedRow = row
  }

  deleteMessage(id: string) {
    this.db.collection<IMessage>('docuseatMessages').doc(id).delete()
      .then()
      .catch(console.log)
  }

  createMessage(message:string) {
    event.preventDefault()
    this.message.nativeElement.value = ''
    this.db.collection<IMessage>('docuseatMessages').add(
      {
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        message: message
      }
    )
    .then(console.log)
    .catch(console.log)
  }
}
