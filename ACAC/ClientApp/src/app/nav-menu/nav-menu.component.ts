import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  show = false;
  raiderprofiles: { raidername: string, raiderimg: string, raiderbanner: string } [];

  lm = 'assets/img/no-profile.png';
  hc = 'assets/img/no-profile.png';
  yr = 'assets/img/no-profile.png';
  ae = 'assets/img/no-profile.png';
  sd = 'assets/img/no-profile.png';
  ts = 'assets/img/no-profile.png';
  vp = 'assets/img/no-profile.png';
  lk = 'assets/img/no-profile.png';

  constructor(private http: HttpClient) {
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

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
