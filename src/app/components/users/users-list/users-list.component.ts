import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from '../../../models/user-model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() displayedColumns: string[] = [];

  dataSource = new MatTableDataSource([]);

  @Output() deleteUserEvent = new EventEmitter<string>();

  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<User[]>([]);
  private subscription: Subscription;
  // change data to use getter and setter
  @Input()
  set userDetails(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  };

  get userDetails() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }
  constructor() { }

  ngOnInit() {

    // now we can subscribe to it, whenever input changes,
    // we will run our grouping logic
    this.subscription = this._data
      .subscribe(x => {
        this.dataSource.data = this.userDetails;
      });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  deleteCall(user) {
    this.deleteUserEvent.emit(user);
  }

}
