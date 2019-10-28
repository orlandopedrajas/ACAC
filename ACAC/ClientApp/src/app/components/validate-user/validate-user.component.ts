import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { NavMenuComponent } from '../../nav-menu/nav-menu.component';

export interface DialogData {
    username: string;
    password: string;
}

@Component({
    selector: 'app-validate-user',
    templateUrl: './validate-user.component.html',
    styleUrls: ['./validate-user.component.css']
  })
  export class ValidateUserComponent {
    hide = true;
    validLogin = true;
    // tslint:disable-next-line: max-line-length
    constructor(private cookieService: CookieService, private http: HttpClient,
                public dialogRef: MatDialogRef<NavMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    validate(): void {
      const baseUrl = document.getElementsByTagName('base')[0].href;

      // tslint:disable-next-line: max-line-length
      this.http.get<any>(baseUrl + 'api/ACAC/startLogin?userName=' +
      this.data.username + '&password=' + this.data.password).subscribe(result => {
          this.cookieService.set('loggedin', result.gString);
          if (typeof result.gString === 'undefined' || result.gString === null) {
            this.validLogin = false;
          } else {
            this.validLogin = true;
            window.location.reload();
          }
      }, error => console.error(error));

    }
  }
