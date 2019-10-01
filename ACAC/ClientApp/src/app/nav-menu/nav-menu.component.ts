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
  raiderprofiles: { img: string, name: string } [];

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

    http.get<{ img: any, name: any }[]>(baseUrl + 'api/ItemDrop/GetProfiles').subscribe(result => {
     if (result) {
        this.raiderprofiles = result;
        this.raiderprofiles.forEach((value) => {
            switch (value.name) {
              case 'Aerilyn Elessedil': {
                this.ae = value.img;
                break;
               }
               case 'Hades Carmine': {
                this.hc = value.img;
                break;
               }
               case 'La Ki': {
                this.lk = value.img;
                break;
               }
               case 'Lan Mantear': {
                this.lm = value.img;
                break;
               }
               case 'Shelly Duncan': {
                this.sd = value.img;
                break;
               }
               case 'Thomas Silverstar': {
                this.ts = value.img;
                break;
               }
               case 'Val Phoenix': {
                this.vp = value.img;
                break;
               }
              case 'Yumi Rin': {
               this.yr = value.img;
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
