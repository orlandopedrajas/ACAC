import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface SavageItem {
  dateReceived: Date;
  floor: string;
  raider: string;
  droptype: string;
  id: string;
  img: string;
  name: string;
}
@Component({
  selector: 'app-item-drop-history',
  templateUrl: './item-drop-history.component.html',
  styleUrls: ['./item-drop-history.component.css']
})

export class ItemDropHistoryComponent {
  SavageItems: SavageItem[];
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/xItemDrops').subscribe(result => {
     this.SavageItems = result;
     // tslint:disable-next-line: only-arrow-functions
     this.SavageItems.forEach(function(value) {
        value.img = value.raider.split(',')[1];
        value.name = value.raider.split(',')[0];
     });
   }, error => console.error(error));
  }

  OnRemoveItem(id: any) {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);

    this.http.post('./api/ItemDrop/DeleteItemById', JSON.stringify(id), {headers: header}).subscribe(
      (val) => { console.log('POST call successful value returned in body', val); },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
    window.location.reload();
  }

}
