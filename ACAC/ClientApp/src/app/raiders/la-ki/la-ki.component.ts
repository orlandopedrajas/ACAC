import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

@Component({
  selector: 'app-la-ki',
  templateUrl: './la-ki.component.html',
  styleUrls: ['./la-ki.component.css']
})

export class LaKiComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: SavageItem[];
  photo = 'assets/img/no-profile.png';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=La Ki').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
        // tslint:disable-next-line: deprecation
    http.get<{ img: any, name: any }[]>(baseUrl + 'api/ItemDrop/GetProfiles').subscribe(result => {
      if (result) {
          result.forEach((value) => {
              if (value.name === 'La Ki') {
                this.photo = value.img;
              }
          });
      }
    }, error => console.error(error));
  }
}

