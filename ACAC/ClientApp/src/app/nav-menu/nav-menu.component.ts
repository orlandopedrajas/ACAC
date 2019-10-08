import { Component, Inject  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  show = false;

  username: string;
  password: string;

  lm = 'assets/img/no-profile.png';
  hc = 'assets/img/no-profile.png';
  yr = 'assets/img/no-profile.png';
  ae = 'assets/img/no-profile.png';
  sd = 'assets/img/no-profile.png';
  ts = 'assets/img/no-profile.png';
  vp = 'assets/img/no-profile.png';
  lk = 'assets/img/no-profile.png';

  constructor(private http: HttpClient, public dialog: MatDialog) {
    const baseUrl = document.getElementsByTagName('base')[0].href;

    http.get<{ raidername: string, raiderimg: string, raiderbanner: string }[]>(baseUrl + 'api/ACAC/GetAllProfiles').subscribe(result => {
     if (result) {
        this.raiderprofiles = result;
        this.raiderprofiles.forEach((value) => {
            switch (value.raidername) {
              case 'Aerilyn Elessedil': {
                this.ae = value.raiderimg;
                break;
               }
               case 'Hades Carmine': {
                this.hc = value.raiderimg;
                break;
               }
               case 'La Ki': {
                this.lk = value.raiderimg;
                break;
               }
               case 'Lan Mantear': {
                this.lm = value.raiderimg;
                break;
               }
               case 'Shelly Duncan': {
                this.sd = value.raiderimg;
                break;
               }
               case 'Thomas Silverstar': {
                this.ts = value.raiderimg;
                break;
               }
               case 'Val Phoenix': {
                this.vp = value.raiderimg;
                break;
               }
              case 'Yumi Rin': {
               this.yr = value.raiderimg;
               break;
              }
            }
        });
     }
   }, error => console.error(error));

  }

  openDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ValidateUserComponent, {
      width: '300px',
      data: {username: this.username, password: this.password }
    });
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.css']
})
export class ValidateUserComponent {
  hide = true;
  ACACAuth: any;

  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<NavMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  validate(): void {

  }
}
