import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-archived-item-drop',
  templateUrl: './archived-item-drop.component.html',
  styleUrls: ['./archived-item-drop.component.css']
})

export class ArchivedItemDropComponent {
  SavageItems: SavageItem[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/xItemDropArchives').subscribe(result => {
     this.SavageItems = result;
   }, error => console.error(error));
  }
}

interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
  dateArchived: string;
}
