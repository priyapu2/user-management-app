import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  @Output() addUserEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  addUser() {
    this.addUserEvent.emit();
  }
}
