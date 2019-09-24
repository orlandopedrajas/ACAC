import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-val-phoenix',
  templateUrl: './val-phoenix.component.html',
  styleUrls: ['./val-phoenix.component.css']
})

export class ValPhoenixComponent {
    SavageItems: SavageItem[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Val Phoenix').subscribe(result => {
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
