import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { RaiderIdentity } from '../components/ACACComponents';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  loggedIn: boolean;
  isAdmin: boolean;
  discorduser: string;
  discordavatar: string;

  isExpanded = false;
  show = false;

  username: string;
  password: string;

  raiders: any[];
  raiderIdentity: RaiderIdentity;

  constructor(private cookieService: CookieService, private http: HttpClient, public dialog: MatDialog) {

    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.raiderIdentity = new RaiderIdentity(this.cookieService);
    this.isAdmin = this.raiderIdentity.Raideridentity().IsAdmin;
    this.discorduser = this.raiderIdentity.Raideridentity().discorduser;
    this.discordavatar = this.raiderIdentity.Raideridentity().discordavatar;

    if (this.discorduser.length === 0) {
      cookieService.deleteAll();
      this.loggedIn = false;
      this.discordavatar = 'assets/img/discord.png';
    } else {
       this.loggedIn = true;
    }

}

  openDialog(): void {

    const CLIENT_ID = '638422083788996619';
    const REDIRECT_URI = environment.redirecturl;
    const AuthUrl = 'https://discordapp.com/api/oauth2/authorize?' +
                    'response_type=code' +
                    '&client_id=' + CLIENT_ID +
                    '&scope=identify' +
                    '&prompt=consent' +
                    '&redirect_uri=' + REDIRECT_URI;

    window.location.href = AuthUrl;
  }
  Onlogout(): void {
     this.cookieService.delete('discorduser', '/');
     this.cookieService.delete('discordavatar', '/');
     this.cookieService.deleteAll('/');
     window.location.reload();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
    this.getRaiderProfiles();
  }

  getRaiderProfiles() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
      this.raiders = result;
      // console.log(this.raiders);
    });
  }
}
