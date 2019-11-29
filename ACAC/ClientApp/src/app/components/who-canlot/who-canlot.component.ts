import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../helpers/api';

@Component({
    selector: 'app-who-canlot',
    templateUrl: './who-canlot.component.html',
    styleUrls: ['./who-canlot.component.scss']
})

export class WhocanlotCoreComponent implements OnChanges  {

    raidContent: any[];

    ngOnChanges() {
       // this.getRaidContent();
    }

    getRaidContent() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentid=').subscribe(result => {
        this.raidContent = result.filter(r => r._raidContent.isenabled === true);
        console.log(this.raidContent);
      });
    }
    constructor(private http: HttpClient) {
        this.getRaidContent();
    }
}
