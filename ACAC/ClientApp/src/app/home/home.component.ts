import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EditUserDetailsDialogComponent } from '../mocks/edit-user-details/edit-user-details.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  discorduser: string;
  discordavatar: string;
  constructor(private cookieService: CookieService, public dialog: MatDialog) {
      this.discorduser = cookieService.get('discorduser');
      this.discordavatar = cookieService.get('discordavatar');
  }

  TestMe() {
    const dialogRef = this.dialog.open(EditUserDetailsDialogComponent, {
      width: '800px',
      data: 'Remove this item?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
}
}
