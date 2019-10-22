import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ValidateUserComponent } from '../components/validate-user/validate-user.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  loggedIn: any;
  isExpanded = false;
  show = false;
  raiderprofiles: any[];

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

  constructor(private cookieService: CookieService, private http: HttpClient, public dialog: MatDialog) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.loggedIn = cookieService.get('loggedin');
    this.http.get<any>(baseUrl + 'api/ACAC/validate?g=' + this.loggedIn).subscribe(result => {
      if (!result) {
        this.cookieService.delete('loggedin');
      }
      // tslint:disable-next-line: no-shadowed-variable
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
  }, error => console.error(error));
}

  openDialog(): void {
     // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ValidateUserComponent, {
      width: '300px',
      data: {username: this.username, password: this.password }
    });
  }
  Onlogout(): void {
     this.cookieService.delete('loggedin');
     window.location.reload();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
