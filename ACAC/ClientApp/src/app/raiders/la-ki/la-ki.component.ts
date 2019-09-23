import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-la-ki',
  templateUrl: './la-ki.component.html',
  styleUrls: ['./la-ki.component.css']
})

export class LaKiComponent {
    SavageItems: SavageItem[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=La Ki').subscribe(result => {
       this.SavageItems = result;
     }, error => console.error(error));
    }
  }
  interface SavageItem {
    dateReceived: string;
    floor: string;
    raider: string;
    droptype: string;
  }
