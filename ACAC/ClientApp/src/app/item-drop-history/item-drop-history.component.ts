import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-item-drop-history',
  templateUrl: './item-drop-history.component.html',
  styleUrls: ['./item-drop-history.component.css']
})

export class ItemDropHistoryComponent {

  loggedIn = false;
  SavageItems: any[];
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];

  constructor(private cookieService: CookieService, private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems').subscribe(result => {
      this.SavageItems = result;
   }, error => console.error(error));

    if (cookieService.get('userInfo').length > 0) {
      this.loggedIn = true;
    } else { this.loggedIn = false; }

  }

  OnRemoveItem(id: any) {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);

    this.http.post('./api/ACAC/DeleteItemById', JSON.stringify(id), {headers: header}).subscribe(
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
