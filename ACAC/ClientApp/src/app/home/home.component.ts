import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {


  constructor(public dialog: MatDialog) {  }
}
