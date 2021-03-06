import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { RaiderIdentity } from '../../components/ACACComponents';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-item-drop-by-floor',
    templateUrl: './item-drop-by-floor.component.html',
    styleUrls: ['./item-drop-by-floor.component.css'],
    providers: [DatePipe]
})

export class ItemDropByFloorComponent implements OnInit, OnChanges {

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    @Input() Displaytype: string; // 0 = recent, 1 = all, 2 = filter by floors, 3 = group by date
    @Input() Contentid: string;
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
    raiderIdentity: RaiderIdentity = new RaiderIdentity();
    drops;
    floors; // any[] = null;
    dropsraider: any[] = null;
    groupbydate: any[] = null;
    dataSource;
    ngOnInit() { }
    ngOnChanges() {
        this.GetItems();
     }
    GetItems() {

        this.drops = null;
        this.floors = null;
        const baseUrl = document.getElementsByTagName('base')[0].href;

        switch (this.Displaytype) {
            case '0': { // Recent drops
                this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidItemDrop').toPromise().then(result1 => {
                    this.drops = new MatTableDataSource(result1.sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                    this.drops.paginator = this.paginator;
                }, error => console.error(error));
                break;
            }
            case '1': { // All drops
                this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidItemDrop').toPromise().then(result1 => {
                   this.drops = new MatTableDataSource(result1.sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                   this.drops.paginator = this.paginator;
                }, error => console.error(error));
                
                break;
            }
            case '2': { // filter by floors, group by date
                this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidItemDropByContentId?contentid=' + this.Contentid).toPromise().then(result1 => {
                    this.drops = new MatTableDataSource(result1.sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1));
                    this.drops.paginator = this.paginator;
                }, error => console.error(error));
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
          data: 'Remove this item?'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const headerJson = {'Content-Type': 'application/json'};
            const header = new HttpHeaders(headerJson);
            this.http.post('./api/ACAC2/DeleteItemDrop', JSON.stringify(id), {headers: header}).subscribe((val) => {  }, response => { },
              () => { this.GetItems(); }
            );
          }
        });
    }

    constructor(private http: HttpClient, public dialog: MatDialog, private datePipe: DatePipe) {
        if (this.raiderIdentity === null) {
            this.raiderIdentity = new RaiderIdentity();
        }
    }
}
