import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-lan-mantear',
  templateUrl: './lan-mantear.component.html',
  styleUrls: ['./lan-mantear.component.css']
})

export class LanMantearComponent {
    SavageItems: SavageItem[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Lan Mantear').subscribe(result => {
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
