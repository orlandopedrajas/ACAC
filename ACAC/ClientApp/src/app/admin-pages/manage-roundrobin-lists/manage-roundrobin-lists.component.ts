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

    constructor(private http: HttpClient) {
        this.getRaidContent();
        this.getRaiders();
     }

    getRaidContent() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent').subscribe(result => {
          this.raidContent = result;
          // console.log(this.raidContent);
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

          //console.log(this.raiders);
          //console.log(result);
          console.log(this.validraiders);

        });
     }

     getRaiders() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles').subscribe(result => {
          this.raiders = result.filter(r => r.israidmember === true);
          // console.log(this.raiders);
        });
     }
}
