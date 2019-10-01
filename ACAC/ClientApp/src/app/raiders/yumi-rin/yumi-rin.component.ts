import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

@Component({
  selector: 'app-yumi-rin',
  templateUrl: './yumi-rin.component.html',
  styleUrls: ['./yumi-rin.component.css']
})

export class YumiRinComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: SavageItem[];
  photo = 'assets/img/no-profile.png';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Yumi Rin').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
    // tslint:disable-next-line: deprecation
    http.get<{ img: any, name: any }[]>(baseUrl + 'api/ItemDrop/GetProfiles').subscribe(result => {
      if (result) {
          result.forEach((value) => {
              if (value.name === 'Yumi Rin') {
                this.photo = value.img;
              }
          });
      }
    }, error => console.error(error));
  }
}

