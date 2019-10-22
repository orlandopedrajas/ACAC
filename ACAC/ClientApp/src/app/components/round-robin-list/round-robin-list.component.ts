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
    @Input() Floorname: string;
    roundrobinlists: any[] = [];
    displayedColumns: string[] = ['raiditem'];

    ngOnInit() {}
    ngOnChanges() {

        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.roundrobinlists = [];

        this.http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=' + this.Floorname).subscribe(result => {

            switch (this.Floorname) {
                case 'Eden Savage Floor 1': {
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Accessory Coffer'));
                    break;
                }
                case 'Eden Savage Floor 2': {
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Equipment Coffer'));
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Deepshadow Coating'));
                    break;
                }
                case 'Eden Savage Floor 3': {
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Equipment Coffer'));
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Deepshadow Twine'));
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Deepshadow Solvent'));
                    break;
                }
                case 'Eden Savage Floor 4': {
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Chest Coffer'));
                    this.roundrobinlists.push(this.Generateroundrobinlist(result, 'Weapon Coffer'));
                    break;
                }
            }

        }, error => console.error(error));

    }
    constructor(private http: HttpClient) {}

    Generateroundrobinlist(result, listname) {
        const roundrobinlist = new RoundRobinList();
        roundrobinlist.listname = listname;
        roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === listname);
        return roundrobinlist;
    }
}
