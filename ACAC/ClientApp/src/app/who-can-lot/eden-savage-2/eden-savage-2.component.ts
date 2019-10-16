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
  displayedColumns: string[] = ['raiditem'];

  history1: any[];
  history2: any[];
  history3: any[];

  profiles1: any[] = [''];
  profiles2: any[] = [''];
  profiles3: any[] = [''];

  previousValue: any = '';

  itemsbyProfile: any[] = new Array();
  itemsbyProfile2: any[] = new Array();
  itemsbyProfile3: any[] = new Array();

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 2').subscribe(result => {

      this.Items1 = result.filter(r => r.raiditem === 'Equipment Coffer');
      this.Items2 = result.filter(r => r.raiditem === 'Deepshadow Coating');

     }, error => console.error(error));

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 2').subscribe(result => {

      this.history1 = result.filter(r => r.raidItem === 'Equipment Coffer')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
      this.history1.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
          if (this.previousValue !== value.raidername) {
            this.profiles1.push(value.raidername);
            this.previousValue = value.raidername;
          }
      });
      this.profiles1.forEach((value) => {
        if (value !== '') {
          // tslint:disable-next-line: max-line-length
          this.itemsbyProfile.push(this.history1.filter(r => r.raidername === value)
                             .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
        }
      });
      this.previousValue = '';
      this.history2 = result.filter(r => r.raidItem === 'Deepshadow Coating')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
      this.history2.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
        if (this.previousValue !== value.raidername) {
          this.profiles2.push(value.raidername);
          this.previousValue = value.raidername;
        }
      });
      this.profiles2.forEach((value) => {
        if (value !== '') {
          // tslint:disable-next-line: max-line-length
          this.itemsbyProfile2.push(this.history2.filter(r => r.raidername === value)
                              .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
        }
      });
      this.previousValue = '';
      this.history3 = result.filter(r => r.raidItem !== 'Equipment Coffer' && r.raidItem !== 'Deepshadow Coating')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
      this.history3.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
        if (this.previousValue !== value.raidername) {
          this.profiles3.push(value.raidername);
          this.previousValue = value.raidername;
        }
      });

      this.profiles3.forEach((value) => {
        if (value !== '') {
          // tslint:disable-next-line: max-line-length
          this.itemsbyProfile3.push(this.history3.filter(r => r.raidername === value)
                              .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
        }
      });

    }, error => console.error(error));
  }
}
