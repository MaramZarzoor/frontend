import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<UserDetailsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
close(){
    this.dialogRef.close()
}
}
