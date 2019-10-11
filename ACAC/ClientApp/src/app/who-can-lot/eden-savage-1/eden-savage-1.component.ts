import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-eden-savage-1',
  templateUrl: './eden-savage-1.component.html',
  styleUrls: ['./eden-savage-1.component.css']
})

export class EdenSavage1Component {

  displayedColumns: string[] = ['raiditem'];
  displayedColumns1: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
  EquipmentItems: any[];
  SavageItems: any[] ;
  previousValue: string;

  profiles: any[] = [''];
  itemsbyProfile: any[] = new Array();

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 1').subscribe(result => {
      this.EquipmentItems = result;
     }, error => console.error(error));

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 1').subscribe(result => {
      // console.log(result);
      this.SavageItems = result.sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);

      result.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
          // console.log(value);
          if (this.previousValue !== value.raidername) {
            this.profiles.push(value.raidername);
            this.previousValue = value.raidername;
          }
      });

      this.profiles.forEach((value) => {
        if (value !== '') {
          this.itemsbyProfile.push(result.filter(r => r.raidername === value).sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
        }
      });

    }, error => console.error(error));
  }
}
