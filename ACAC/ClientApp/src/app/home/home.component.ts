import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  discorduser: string;
  discordavatar: string;
  constructor(private cookieService: CookieService) {
      this.discorduser = cookieService.get('discorduser');
      this.discordavatar = cookieService.get('discordavatar');

  }
}
