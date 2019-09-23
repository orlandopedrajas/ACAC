import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-thomas-silverstar',
  templateUrl: './thomas-silverstar.component.html',
  styleUrls: ['./thomas-silverstar.component.css']
})

export class ThomasSilverstarComponent {
    SavageItems: SavageItem[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Thomas Silverstar').subscribe(result => {
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
