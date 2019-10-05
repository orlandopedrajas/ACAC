import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-1',
  templateUrl: './eden-savage-1.component.html',
  styleUrls: ['./eden-savage-1.component.css']
})

export class EdenSavage1Component {

  displayedColumns: string[] = ['raiditem'];
  EquipmentItems: any[];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 1').subscribe(result => {
      console.log(result);
      this.EquipmentItems = result;
     }, error => console.error(error));
  }
}
