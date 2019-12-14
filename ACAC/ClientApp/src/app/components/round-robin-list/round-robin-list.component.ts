import { Component, OnChanges, Input } from '@angular/core';
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
export class RoundRobinListComponent implements OnChanges {
    @Input() contentid: string;
    raidcontent: any;
    raiditems: any[];
    displayedColumns: string[] = ['raiditem'];

    ngOnChanges() {

        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.raiditems = [];
        let ri;

        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentid=' + this.contentid).subscribe(result => {
           this.raidcontent = result[0]._raidContent;
           ri = this.filteredRaiditems(result[0]._RaidItems);
           ri.forEach((value) => {
               this.Generateroundrobinlist(value);
           });
        }, error => console.error(error));


    }
    constructor(private http: HttpClient) {  }

    Generateroundrobinlist(valueitem) {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetSpecificRoundRobinEntry?contentid=' +
                             this.contentid + '&Xraiditem=' + valueitem.raiditemname).subscribe(result => {
           this.raiditems.push({ contentid: valueitem.contentid,
                                 hasroundrobin: valueitem.hasroundrobin,
                                 id: valueitem.id,
                                 raiditemimg: valueitem.raiditemimg,
                                 raiditemname: valueitem.raiditemname,
                                 items: result});

         }, error => console.error(error));
    }

    filteredRaiditems(rrl) {
        return rrl.filter(x => x.hasroundrobin === true);
    }
}
