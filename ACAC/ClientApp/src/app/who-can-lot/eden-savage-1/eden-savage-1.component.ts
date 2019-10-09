import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-1',
  templateUrl: './eden-savage-1.component.html',
  styleUrls: ['./eden-savage-1.component.css']
})

export class EdenSavage1Component {

  displayedColumns: string[] = ['raiditem'];
  displayedColumns1: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
  EquipmentItems: any[];
  SavageItems: any[];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 1').subscribe(result => {
      this.EquipmentItems = result;
     }, error => console.error(error));

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 1').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));
  }
}
