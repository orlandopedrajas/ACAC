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
  displayedColumns: string[] = ['raiditem'];

  history1: any[];
  history2: any[];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 4').subscribe(result => {

      this.Items1 = result.filter(r => r.raiditem === 'Chest Coffer');
      this.Items2 = result.filter(r => r.raiditem === 'Weapon Coffer');

     }, error => console.error(error));

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 4').subscribe(result => {
      this.history1 = result.filter(r => r.raidItem === 'Chest Coffer').sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
      this.history2 = result.filter(r => r.raidItem === 'Weapon Coffer').sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
    }, error => console.error(error));
  }
}
