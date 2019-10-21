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
        console.log('ngOnChanges - ' + this.Floorname);
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.roundrobinlists = [];

        let roundrobinlist: RoundRobinList;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=' + this.Floorname).subscribe(result => {

            switch (this.Floorname) {
                case 'Eden Savage Floor 1': {
                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Accessory Coffer';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Accessory Coffer');
                    this.roundrobinlists.push(roundrobinlist);
                    break;
                }
                case 'Eden Savage Floor 2': {
                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Equipment Coffer';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Equipment Coffer');
                    this.roundrobinlists.push(roundrobinlist);

                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Deepshadow Coating';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Deepshadow Coating');
                    this.roundrobinlists.push(roundrobinlist);

                    break;
                }
                case 'Eden Savage Floor 3': {

                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Equipment Coffer';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Equipment Coffer');
                    this.roundrobinlists.push(roundrobinlist);

                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Deepshadow Coating';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Deepshadow Twine');
                    this.roundrobinlists.push(roundrobinlist);

                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Deepshadow Solvent';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Deepshadow Solvent');
                    this.roundrobinlists.push(roundrobinlist);

                    break;
                }
                case 'Eden Savage Floor 4': {

                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Chest Coffer';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Chest Coffer');
                    this.roundrobinlists.push(roundrobinlist);

                    roundrobinlist = new RoundRobinList();
                    roundrobinlist.listname = 'Weapon Coffer';
                    roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Weapon Coffer');
                    this.roundrobinlists.push(roundrobinlist);

                    break;
                }
            }
            console.log(this.roundrobinlists);
        }, error => console.error(error));

    }
    constructor(private http: HttpClient) {}
}
