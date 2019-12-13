import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Rrr {
  contentid: number;
  raiditem: string;
  raideriteminfo: number;
  raiders: any[];
}

@Component({
    selector: 'app-manage-roundrobin-lists',
    templateUrl: './manage-roundrobin-lists.component.html'
})

export class ManageRoundrobinListsComponent {

    raidContent: any[];
    raiders: any[];
    validraiders: any[];

    rrr = new Rrr();

    constructor(private http: HttpClient) {
         this.getRaiders();
         this.getRaidContent();
     }

    getRaidContent() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent').subscribe(result => {
          this.raidContent = result;
          // console.log(result);
        });
    }

    filteredRaiditems(RaidItems) {
      return RaidItems.filter(x => x.hasroundrobin === true);
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
       this.rrr.raiders = $event;
       this.rrr.contentid = contentid;
       this.rrr.raiditem = raiditem;
       this.rrr.raideriteminfo = raiditemid;
       // console.log(this.rrr);
     }
     onSubmit() {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);

        this.http.post('./api/ACAC2/Roundrobinreset', JSON.stringify(this.rrr), {headers: header}).subscribe(
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
