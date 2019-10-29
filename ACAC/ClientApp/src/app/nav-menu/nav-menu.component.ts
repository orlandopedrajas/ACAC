import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  loggedIn: boolean;
  isAdmin: boolean;
  discorduser: string;
  discordavatar: string;

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
    this.isAdmin = false;
    this.discorduser = cookieService.get('discorduser');
    this.discordavatar = cookieService.get('discordavatar');
    if (this.discorduser.length === 0) {
      cookieService.deleteAll();
      this.loggedIn = false;
      this.discordavatar = 'assets/img/discord.png';
    } else {
       this.loggedIn = true;
       if (this.discorduser === 'Lan Mantear') { this.isAdmin = true; }
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
}

  openDialog(): void {

    const CLIENT_ID = '638422083788996619';
    const AuthUrl = 'https://discordapp.com/api/oauth2/authorize?' +
                    'response_type=code' +
                    '&client_id=' + CLIENT_ID +
                    '&scope=identify' +
                    '&prompt=consent';

    window.location.href = AuthUrl;
  }
  Onlogout(): void {
     this.cookieService.deleteAll();
     window.location.reload();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
