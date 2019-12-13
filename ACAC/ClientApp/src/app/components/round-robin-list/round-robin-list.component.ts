import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class RoundRobinList {
    listname: string;
    EquipmentItems: any[];
}

@Component({
    selector: 'app-round-robin-list',
    templateUrl: './round-robin-list.component.html',
    styleUrls: ['./round-robin-list.component.css']
})
export class RoundRobinListComponent implements OnInit, OnChanges {
    @Input() contentid: string;
    roundrobinlists: any[] = [];
    displayedColumns: string[] = ['raiditem'];

    ngOnInit() {}
    ngOnChanges() {

        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.roundrobinlists = [];

        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentid=' + this.contentid).subscribe(result => {
           //  console.log(result); // .sort((a, b) => (a.raiditem > b.raiditem) ? 1 : -1));
           this.roundrobinlists = result[0];
           // console.log(this.roundrobinlists);
        }, error => console.error(error));

    }
    constructor(private http: HttpClient) {}

    Generateroundrobinlist(contentid, Xraiditem) {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetSpecificRoundRobinEntry?contentid=' +
                             contentid + '&Xraiditem=' + Xraiditem).subscribe(result => {
            //  console.log(result); // .sort((a, b) => (a.raiditem > b.raiditem) ? 1 : -1));
            console.log(result);
            return result;
         }, error => console.error(error));
    }

    filteredRaiditems(rrl) {
        console.log(rrl);
        return rrl.filter(x => x.hasroundrobin === true);
    }
}
