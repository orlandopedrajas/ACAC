import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-item-drop-history',
  templateUrl: './item-drop-history.component.html',
  styleUrls: ['./item-drop-history.component.css']
})

export class ItemDropHistoryComponent {
  SavageItems: SavageItem[];
  resetCommand = 'hardreset';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/xItemDrops').subscribe(result => {
     this.SavageItems = result;
   }, error => console.error(error));
  }

  //onClick_ResetDb() {
  //  const headerJson = { 'Content-Type': 'application/json' };
  //  const header = new HttpHeaders(headerJson);

  //  this.http.post('./api/ItemDrop/ResetDb', JSON.stringify(this.resetCommand), { headers: header }).subscribe(
  //    (val) => { console.log('POST call successful value returned in body', val); },
  //    response => {
  //      console.log('POST call in error', response);
  //    },
  //    () => {
  //      console.log('The POST observable is now completed.');
  //    });
  //  window.location.href = '../';
  //}
}

interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}
