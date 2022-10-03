import {Component, Input, OnInit} from '@angular/core';
import {PopUpComponent} from "../pop-up/pop-up.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  @Input() student: any;
  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(PopUpComponent, {
      data : this.student
    });
  }
}
