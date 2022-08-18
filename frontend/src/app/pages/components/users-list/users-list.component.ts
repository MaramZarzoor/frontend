import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {GetUserById, GetUsers, Logout} from "../../state/pages.actions";
import {PagesState} from "../../state/pages.state";
import {MatDialog} from "@angular/material/dialog";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  dataSource: [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  private dialogRef: any;

  constructor(private store: Store, public dialog: MatDialog, private router: Router) {
    this.store.dispatch(new GetUsers()).pipe(
        catchError(err => {
        this.router.navigate(['pages','auth'])
          return of('')
        })
      ).subscribe(res => {
      this.dataSource = this.store.selectSnapshot(PagesState.users);
    });

  }

  ngOnInit(): void {
  }

  getUserById(id: number) {
    this.store.dispatch(new GetUserById(id)).subscribe(res => {
      this.dialogRef = this.dialog.open(UserDetailsComponent, {
        width: '50%',
        height: '50%',
        data: this.store.selectSnapshot(PagesState.userInfo)
      });
    })
  }


}
