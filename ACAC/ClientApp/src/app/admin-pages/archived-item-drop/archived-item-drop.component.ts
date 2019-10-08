import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
  dateArchived: string;
}

@Component({
  selector: 'app-archived-item-drop',
  templateUrl: './archived-item-drop.component.html',
  styleUrls: ['./archived-item-drop.component.css']
})

export class ArchivedItemDropComponent {
  SavageItems: any[];
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'datearchived'];
  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetArchivedRaidItems').subscribe(result => {
      this.SavageItems = result;
   }, error => console.error(error));
  }
}

