import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-2',
  templateUrl: './eden-savage-2.component.html',
  styleUrls: ['./eden-savage-2.component.css']
})

export class EdenSavage2Component {
  Items1: any[];
  Items2: any[];
  displayedColumns1: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
  SavageItems: any[];
  displayedColumns: string[] = ['raiditem'];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 2').subscribe(result => {

      this.Items1 = result.filter(r => r.raiditem === 'Equipment Coffer');
      this.Items2 = result.filter(r => r.raiditem === 'Deepshadow Coating');

     }, error => console.error(error));

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 2').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
  }
}
