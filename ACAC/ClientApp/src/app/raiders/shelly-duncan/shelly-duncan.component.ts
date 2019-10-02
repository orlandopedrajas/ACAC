import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

@Component({
  selector: 'app-shelly-duncan',
  templateUrl: './shelly-duncan.component.html',
  styleUrls: ['./shelly-duncan.component.css']
})

export class ShellyDuncanComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: SavageItem[];
  photo = 'assets/img/no-profile.png';
  banner = '';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Shelly Duncan').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
    // tslint:disable-next-line: deprecation
    http.get<{ img: any, banner: any, name: any }[]>(baseUrl + 'api/ItemDrop/GetProfiles').subscribe(result => {
      if (result) {
          result.forEach((value) => {
              if (value.name === 'Shelly Duncan') {
                this.photo = value.img;
                this.banner = value.banner;
              }
          });
      }
    }, error => console.error(error));
  }
}
