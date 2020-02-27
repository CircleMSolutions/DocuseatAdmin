import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';

export interface IIncident {
  date: firebase.firestore.Timestamp;
  guardian: string;
  station: string;
  shift: string;
  reportingMember: string;
}

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<IIncident>;
  dataSource = new MatTableDataSource<IIncident>()


  currentCollection:string = ''
  destroySub$: Subject<string> = new Subject()

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'guardian', 'station', 'reportingMember'];
  
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
  }

  changeCollection(collection: string) {
    this.db.collection<IIncident>(collection).valueChanges()
      .pipe(takeUntil(this.destroySub$))
      .subscribe(results => {
        this.currentCollection = collection
        this.dataSource.data = results
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this.destroySub$.next('destroy')
  }
}
