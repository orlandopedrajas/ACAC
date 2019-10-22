import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-item-drop-by-floor',
    templateUrl: './item-drop-by-floor.component.html',
    styleUrls: ['./item-drop-by-floor.component.css']
})

export class ItemDropByFloorComponent implements OnInit, OnChanges {

    @Input() Displaytype: string; // 0 = all, 1 = group by floor, 2= group by drops > raider
    @Input() Floorname: string;
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
    loggedin;
    drops: any[] = null;
    floors: any[] = null;
    dropsraider: any[] = null;

    ngOnInit() {}
    ngOnChanges() {
        this.GetItems();
    }

    GetItems() {

        this.drops = null;
        this.floors = null;
        const baseUrl = document.getElementsByTagName('base')[0].href;
        switch (this.Displaytype) {
            case '0': {
                this.drops = [];
                this.http.get<any>(baseUrl + 'api/ACAC/validate?g=' + this.cookieService.get('loggedin')).subscribe(result => {
                    if (result) { this.loggedin = true; } else {
                        this.cookieService.delete('loggedin');
                        this.loggedin = false;
                    }
                    this.http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems').subscribe(result1 => {
                        this.drops = result1;
                    }, error => console.error(error));
                }, error => console.error(error));
                break;
            }
            case '1': {
                this.floors = [];
                this.http.get<any>(baseUrl + 'api/ACAC/validate?g=' + this.cookieService.get('loggedin')).subscribe(result => {
                    if (result) { this.loggedin = true; } else {
                        this.cookieService.delete('loggedin');
                        this.loggedin = false;
                    }
                    this.http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems').subscribe(result1 => {
                        this.floors.push({ floorname: 'Eden Savage Floor 1',
                                           flooricon: 'https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/65-icon.jpg',
                                           floor: result1.filter(r => r.raidfloorname === 'Eden Savage Floor 1') });

                        this.floors.push({ floorname: 'Eden Savage Floor 2',
                                           flooricon: 'https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/66-icon.jpg',
                                           floor: result1.filter(r => r.raidfloorname === 'Eden Savage Floor 2') });

                        this.floors.push({ floorname: 'Eden Savage Floor 3',
                                           flooricon: 'https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/67-icon.jpg',
                                           floor: result1.filter(r => r.raidfloorname === 'Eden Savage Floor 3') });

                        this.floors.push({ floorname: 'Eden Savage Floor 4',
                                           flooricon: 'https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/68-icon.jpg',
                                           floor: result1.filter(r => r.raidfloorname === 'Eden Savage Floor 4') });
                    }, error => console.error(error));
                }, error => console.error(error));
                break;
            }
            case '2': {
                this.dropsraider = [];
                switch (this.Floorname) {
                    case 'Eden Savage Floor 1': {
                        this.http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 1').subscribe(result => {
                            this.dropsraider.push({itemname: 'Accessory Coffer: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Accessory Coffer') });
                        });
                        break;
                    }
                    case 'Eden Savage Floor 2': {
                        this.http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 2').subscribe(result => {
                            this.dropsraider.push({itemname: 'Equipment Coffer: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Equipment Coffer') });
                            this.dropsraider.push({itemname: 'Deepshadow Coating: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Deepshadow Coating') });
                            this.dropsraider.push({itemname: 'Other: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'other') });
                        });
                        break;
                    }
                    case 'Eden Savage Floor 3': {
                        this.http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 3').subscribe(result => {
                            this.dropsraider.push({itemname: 'Equipment Coffer: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Equipment Coffer') });
                            this.dropsraider.push({itemname: 'Deepshadow Twine: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Deepshadow Twine') });
                            this.dropsraider.push({itemname: 'Deepshadow Solvent: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Deepshadow Solvent') });
                        });
                        break;
                    }
                    case 'Eden Savage Floor 4': {
                        this.http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItemsByFloor?XFloor=Eden Savage Floor 4').subscribe(result => {
                            this.dropsraider.push({itemname: 'Chest Coffer: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Chest Coffer') });
                            this.dropsraider.push({itemname: 'Weapon Coffer: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'Weapon Coffer') });
                            this.dropsraider.push({itemname: 'Other: Drops History by Raider',
                                                   item: this.GenerateArrayItem(result, 'other') });
                        });
                        break;
                    }
                }
                break;
            }
        }
    }

    GenerateArrayItem(result, filter) {
        let history: any[] = [];
        let previousvalue;
        const profiles: any[] = [];
        const itemsbyprofile: any[] = [];
        if (filter === 'other') {
            history = result.filter(r => r.raidItem !== 'Equipment Coffer'
            && r.raidItem !== 'Deepshadow Coating' && r.raidItem !== 'Chest Coffer' && r.raidItem !== 'Weapon Coffer')
            .sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
        } else {
            history = result.filter(r => r.raidItem === filter).sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
        }
        history.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
            if (previousvalue !== value.raidername) {
                    profiles.push(value.raidername);
                    previousvalue = value.raidername;
            }
        });

        profiles.forEach((value) => {
            if (value !== '') {
                itemsbyprofile.push(history.filter(r => r.raidername === value)
                .sort((a, b) => (a.receiveddate < b. receiveddate) ? 1 : -1));
            }
        });
        return itemsbyprofile;
    }
    OnRemoveItem(id: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '350px',
          data: 'Do you confirm the delete of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const headerJson = {'Content-Type': 'application/json'};
            const header = new HttpHeaders(headerJson);
            this.http.post('./api/ACAC/DeleteItemById', JSON.stringify(id), {headers: header}).subscribe((val) => {  }, response => { },
              () => { this.GetItems(); }
            );
          }
        });
    }
    constructor(private http: HttpClient, private cookieService: CookieService, public dialog: MatDialog) {}
}
