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

    ngOnInit() {}
    ngOnChanges() {

        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=' + this.charactername).subscribe(result => {
            this.SavageItems = result;
          }, error => console.error(error));
    }
    constructor(private http: HttpClient) {}
}
