import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-drop-history',
  templateUrl: './item-drop-history.component.html',
  styleUrls: ['./item-drop-history.component.css']
})

export class ItemDropHistoryComponent {
  SavageItems: SavageItem[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/xItemDrops').subscribe(result => {
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
