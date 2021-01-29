import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-item-drop',
    templateUrl: './item-drop.component.html',
    styleUrls: ['./item-drop.component.css']
})

export class ItemDropComponent implements OnInit, OnChanges {

    @Input() charactername: string;
    SavageItems: any[];
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    count: number;

    ngOnInit() { }
    ngOnChanges() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidItemDrop?raidername=' + this.charactername).toPromise().then(result => {
            this.SavageItems = result.sort((a, b) => (a.receiveddate < b.receiveddate) ? 1 : -1);
            this.count = this.SavageItems.length;
          }, error => console.error(error));
     }

    constructor(private http: HttpClient) { }

}
