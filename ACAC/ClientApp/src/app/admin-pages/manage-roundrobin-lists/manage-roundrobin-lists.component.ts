import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-manage-roundrobin-lists',
    templateUrl: './manage-roundrobin-lists.component.html'
})

export class ManageRoundrobinListsComponent {

    raidContent: any[];
    raiders: any[];
    validraiders: any[];

    rrr: any[];

    constructor(private http: HttpClient) {
        this.getRaidContent();
        this.getRaiders();
     }

    getRaidContent() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent').subscribe(result => {
          this.raidContent = result;
        });
    }

    getDetail(x, y) {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetSpecificRoundRobinEntry?contentid=' + x + '&Xraiditem=' + y).subscribe(result => {
          this.validraiders = [];
          this.raiders.forEach((value) => {
              if (result.filter(r => r.raidername === value.raidername).length === 0) {
                this.validraiders.push({ raidername: value.raidername,
                                         raiderimg: value.raiderimg,
                                         canlot: false});
              } else {
                this.validraiders.push({ raidername: value.raidername,
                                         raiderimg: value.raiderimg,
                                         canlot: true } );
              }
           });
        });
     }

     getRaiders() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles').subscribe(result => {
          this.raiders = result.filter(r => r.israidmember === true);
          // console.log(this.raiders);
        });
     }

     setlist($event, contentid, raiditem, raiditemid) {
      // console.log(this.raidContent);
     //  console.log($event);
     // console.log(contentid);
      console.log(raiditem);
     // console.log(raiditemid);
     }
     onSubmit() {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);

        // this.http.post('./api/ACAC2/Roundrobinreset', JSON.stringify(this.roundrobinlist), {headers: header}).subscribe(
        //  (val) => { console.log('POST call successful value returned in body', val); },
        //  response => {
        //      console.log('POST call in error', response);
        //  },
         // () => {
        //      console.log('The POST observable is now completed.');
         // });
        // window.location.reload();
     }
}
