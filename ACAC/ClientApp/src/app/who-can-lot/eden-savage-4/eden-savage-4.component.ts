import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-4',
  templateUrl: './eden-savage-4.component.html',
  styleUrls: ['./eden-savage-4.component.css']
})

export class EdenSavage4Component {
  Items1: any[];
  Items2: any[];
  displayedColumns1: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
  SavageItems: any[];
  displayedColumns: string[] = ['raiditem'];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 4').subscribe(result => {

      this.Items1 = result.filter(r => r.raiditem === 'Chest Coffer');
      this.Items2 = result.filter(r => r.raiditem === 'Weapon Coffer');

     }, error => console.error(error));

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 4').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
  }
}
