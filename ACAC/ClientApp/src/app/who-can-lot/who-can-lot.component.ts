import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class WhocanLot {
    floortitle: string;
    floorbanner: string;
    floormessage: string[] = [];
    displayedColumns: string[] = ['raiditem'];
    roundrobinlist: any[] = new Array();
    previousValue: string;
    profiles: any[] = [];
    history: any[];
    items: any[] = new Array();

    constructor(Floortitle: string, Floorbanner: string) {
        this.floortitle = Floortitle;
        this.floorbanner = Floorbanner;
    }
}

export class RoundRobinList {
    listname: string;
    EquipmentItems: any[];
}
export class Items {
    itemname: string;
    itemsbyprofile: any[] = new Array();
}

@Component({
  selector: 'app-eden-savage-1',
  templateUrl: './who-can-lot.component.html',
  styleUrls: ['./who-can-lot.component.css']
})

export class EdenSavage1Component {
    savagefloor = new WhocanLot('Eden Savage Floor 1 - Who can lot?', 'assets/img/eden1.png');
    items = new Items();

    constructor(private http: HttpClient) {
        this.savagefloor.floormessage.push('Round robin Accessory Coffers');

        const baseUrl = document.getElementsByTagName('base')[0].href;
        let roundrobinlist: RoundRobinList;

        http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 1').subscribe(result => {
            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Accessory Coffer';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Accessory Coffer');
            this.savagefloor.roundrobinlist.push(roundrobinlist);

        }, error => console.error(error));

        http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 1').subscribe(result => {
            result.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(result.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });
            this.items.itemname = 'Accessory Coffer: Drops History by Raider';
            this.savagefloor.items.push(this.items);

        }, error => console.error(error));
    }
}

@Component({
    selector: 'app-eden-savage-2',
    templateUrl: './who-can-lot.component.html',
    styleUrls: ['./who-can-lot.component.css']
  })

export class EdenSavage2Component {
    savagefloor = new WhocanLot('Eden Savage Floor 2 - Who can lot?', 'assets/img/eden2.png');
    items: Items;

    constructor(private http: HttpClient) {
        this.savagefloor.floormessage.push('Round robin Equipment Coffers');
        this.savagefloor.floormessage.push('Round robin Deepshadow Coating');
        this.savagefloor.floormessage.push('Weapon Tomestone ... prioritize those who need it for primary weapon > free lot');
        const baseUrl = document.getElementsByTagName('base')[0].href;
        let roundrobinlist: RoundRobinList;

        this.items = new Items();
        http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 2').subscribe(result => {
            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Equipment Coffer';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Equipment Coffer');
            this.savagefloor.roundrobinlist.push(roundrobinlist);

            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Deepshadow Coating';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Deepshadow Coating');
            this.savagefloor.roundrobinlist.push(roundrobinlist);

        }, error => console.error(error));

        http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 2').subscribe(result => {

            // Equipment Coffer
            this.items = new Items();
            this.savagefloor.history = result.filter(r => r.raidItem === 'Equipment Coffer')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Equipment Coffer: Drops History by Raider';
            this.savagefloor.items.push(this.items);

            // Deepshdow Coating
            this.items = new Items();
            this.savagefloor.profiles = [];
            this.savagefloor.history = result.filter(r => r.raidItem === 'Deepshadow Coating')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Deepshadow Coating: Drops History by Raider';
            this.savagefloor.items.push(this.items);

            // Others
            this.items = new Items();
            this.savagefloor.profiles = [];
            this.savagefloor.history = result.filter(r => r.raidItem !== 'Equipment Coffer' && r.raidItem !== 'Deepshadow Coating')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                         .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Other: Drops History by Raider';
            this.savagefloor.items.push(this.items);

        }, error => console.error(error));
    }
}

@Component({
    selector: 'app-eden-savage-3',
    templateUrl: './who-can-lot.component.html',
    styleUrls: ['./who-can-lot.component.css']
  })

export class EdenSavage3Component {
    savagefloor = new WhocanLot('Eden Savage Floor 3 - Who can lot?', 'assets/img/eden3.png');
    items: Items;

    constructor(private http: HttpClient) {
        this.savagefloor.floormessage.push('Round robin Equipment Coffers');
        this.savagefloor.floormessage.push('Round robin Deepshadow Twines');
        // tslint:disable-next-line: max-line-length
        this.savagefloor.floormessage.push('Round robin Deepshadow Solvents priority DPS > Tanks > Heals, among those who have weapon to upgrade');

        const baseUrl = document.getElementsByTagName('base')[0].href;
        let roundrobinlist: RoundRobinList;

        http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 3').subscribe(result => {
            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Equipment Coffer';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Equipment Coffer');
            this.savagefloor.roundrobinlist.push(roundrobinlist);

            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Deepshadow Twine';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Deepshadow Twine');
            this.savagefloor.roundrobinlist.push(roundrobinlist);

            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Deepshadow Solvent';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Deepshadow Solvent');
            this.savagefloor.roundrobinlist.push(roundrobinlist);
        }, error => console.error(error));

        http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 3').subscribe(result => {

            // Equipment Coffer
            this.items = new Items();
            this.savagefloor.history = result.filter(r => r.raidItem === 'Equipment Coffer')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Equipment Coffer: Drops History by Raider';
            this.savagefloor.items.push(this.items);

            // Deepshadow Twine
            this.items = new Items();
            this.savagefloor.profiles = [];
            this.savagefloor.history = result.filter(r => r.raidItem === 'Deepshadow Twine')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Deepshadow Twine: Drops History by Raider';
            this.savagefloor.items.push(this.items);

            // Deepshadow Solvent
            this.items = new Items();
            this.savagefloor.profiles = [];
            this.savagefloor.history = result.filter(r => r.raidItem === 'Deepshadow Solvent')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Deepshadow Solvent: Drops History by Raider';
            this.savagefloor.items.push(this.items);

        }, error => console.error(error));
    }
}

@Component({
    selector: 'app-eden-savage-4',
    templateUrl: './who-can-lot.component.html',
    styleUrls: ['./who-can-lot.component.css']
  })

export class EdenSavage4Component {
    savagefloor = new WhocanLot('Eden Savage Floor 4 - Who can lot?', 'assets/img/eden4.png');
    items: Items;

    constructor(private http: HttpClient) {
        this.savagefloor.floormessage.push('Round robin Chest Coffers');
        this.savagefloor.floormessage.push('Round robin Weapon Coffers... priority DPS > Tanks > Heals');
        const baseUrl = document.getElementsByTagName('base')[0].href;
        let roundrobinlist: RoundRobinList;

        this.items = new Items();
        http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=Eden Savage Floor 4').subscribe(result => {
            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Chest Coffer';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Chest Coffer');
            this.savagefloor.roundrobinlist.push(roundrobinlist);

            roundrobinlist = new RoundRobinList();
            roundrobinlist.listname = 'Weapon Coffer';
            roundrobinlist.EquipmentItems = result.filter(r => r.raiditem === 'Weapon Coffer');
            this.savagefloor.roundrobinlist.push(roundrobinlist);

        }, error => console.error(error));

        http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 4').subscribe(result => {

            // Chest Coffer
            this.items = new Items();
            this.savagefloor.history = result.filter(r => r.raidItem === 'Chest Coffer')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Chest Coffer: Drops History by Raider';
            this.savagefloor.items.push(this.items);

            // Weapon Coffer
            this.items = new Items();
            this.savagefloor.profiles = [];
            this.savagefloor.history = result.filter(r => r.raidItem === 'Weapon Coffer')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Weapon Coffer: Drops History by Raider';
            this.savagefloor.items.push(this.items);

            // Others
            this.items = new Items();
            this.savagefloor.profiles = [];
            this.savagefloor.history = result.filter(r => r.raidItem !== 'Chest Coffer' && r.raidItem !== 'Weapon Coffer')
                            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.savagefloor.history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                if (this.savagefloor.previousValue !== value.raidername) {
                    this.savagefloor.profiles.push(value.raidername);
                    this.savagefloor.previousValue = value.raidername;
                }
            });

            this.savagefloor.profiles.forEach((value) => {
                if (value !== '') {
                this.items.itemsbyprofile.push(this.savagefloor.history.filter(r => r.raidername === value)
                                                     .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                }
            });

            this.savagefloor.previousValue = '';
            this.items.itemname = 'Other: Drops History by Raider';
            this.savagefloor.items.push(this.items);

        }, error => console.error(error));
    }
}
