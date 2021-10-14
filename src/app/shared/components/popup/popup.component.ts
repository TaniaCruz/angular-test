import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Output() public Color:string;

  constructor(public dialog: MatDialog) {
    this.Color = sessionStorage.getItem('color') ??  'purple';
   }

  ngOnInit(): void {
  }

  saveColor() {
    sessionStorage.setItem('color', this.Color)
    this.dialog.closeAll();
  }

  close():void {
    this.dialog.closeAll();
  }

}
