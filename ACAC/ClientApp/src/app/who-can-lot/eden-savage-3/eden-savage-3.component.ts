import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-3',
  templateUrl: './eden-savage-3.component.html',
  styleUrls: ['./eden-savage-3.component.css']
})

export class EdenSavage3Component {

  Items1: any[];
  Items2: any[];
  Items3: any[];
  history1: any[];
  history2: any[];
  history3: any[];
  displayedColumns1: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
  displayedColumns: string[] = ['raiditem'];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 3').subscribe(result => {

      this.Items1 = result.filter(r => r.raiditem === 'Equipment Coffer');
      this.Items2 = result.filter(r => r.raiditem === 'Deepshadow Twine');
      this.Items3 = result.filter(r => r.raiditem === 'Deepshadow Solvent');

     }, error => console.error(error));

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 3').subscribe(result => {
      this.history1 = result.filter(r => r.raidItem === 'Equipment Coffer').sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
      this.history2 = result.filter(r => r.raidItem === 'Deepshadow Twine').sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
      this.history3 = result.filter(r => r.raidItem === 'Deepshadow Solvent').sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
    }, error => console.error(error));
  }
}

