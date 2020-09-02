import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { ThisRaider } from '../components/ACACComponents';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  loggedIn: boolean;
  isAdmin: boolean;
  isninemember: boolean;
  discorduser: string;
  discordavatar: string;
  
  isExpanded = false;
  show = false;

  username: string;
  password: string;
  apptheme: string;

  raiders: any[];
  thisRaider: ThisRaider;

  constructor( private http: HttpClient, public dialog: MatDialog) {

    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.thisRaider = JSON.parse(localStorage.getItem('user'));
    if (this.thisRaider === null) {
      localStorage.removeItem('user');
      this.loggedIn = false;
      this.discordavatar = 'assets/img/discord.png';
    } else {
      this.isAdmin = this.thisRaider.IsAdmin;
      this.isninemember = this.thisRaider.isninemember;
      this.discorduser = this.thisRaider.discorduser;
      this.discordavatar = this.thisRaider.discordavatar;
      this.loggedIn = true;
    }

    this.apptheme = localStorage.getItem('apptheme');
    if (!this.apptheme || this.apptheme === undefined || this.apptheme === "" || this.apptheme.length === 0) {
      this.apptheme = 'acac-light-theme.css';
    }
    this.changeTheme();
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
     localStorage.removeItem('user');
     window.location.reload();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
   // this.getRaiderProfiles();
  }

  getRaiderProfiles() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
      this.raiders = result;
      //console.log(result);
    });
  }

  changeTheme() {
    var element = document.getElementById('themeAsset');
    element.outerHTML = '<link id="themeAsset" rel="stylesheet" href="/styles/' + this.apptheme + '">';
    localStorage.setItem('apptheme',this.apptheme);

  }
  onslidetogglechange() {
    if (this.apptheme === 'acac-light-theme.css')
    {
      this.apptheme = 'acac-dark-theme.css';
    } else { this.apptheme = 'acac-light-theme.css'; }

    this.changeTheme();
  }
  isDarkmode() {
    var breturn = false;
    if (this.apptheme === 'acac-light-theme.css')
    {
      breturn = false;
    }else { 
      breturn = true;
     }
     // console.log(breturn);
     return breturn;
  }
}
