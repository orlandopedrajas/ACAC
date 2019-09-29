import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

@Component({
  selector: 'app-hades-carmine',
  templateUrl: './hades-carmine.component.html',
  styleUrls: ['./hades-carmine.component.css']
})

export class HadesCarmineComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: SavageItem[];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Hades Carmine').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
  }
}