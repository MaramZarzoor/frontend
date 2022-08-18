import { Component, OnInit } from '@angular/core';
import {Logout} from "../../state/pages.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
