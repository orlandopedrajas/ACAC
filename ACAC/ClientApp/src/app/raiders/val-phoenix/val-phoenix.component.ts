import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

@Component({
  selector: 'app-val-phoenix',
  templateUrl: './val-phoenix.component.html',
  styleUrls: ['./val-phoenix.component.css']
})

export class ValPhoenixComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: SavageItem[];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Val Phoenix').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
  }
}

