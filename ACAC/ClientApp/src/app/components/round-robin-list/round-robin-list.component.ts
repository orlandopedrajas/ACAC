import { Component, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { RaiderIdentity } from '../../components/ACACComponents';

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
    raiderIdentity: RaiderIdentity = new RaiderIdentity();

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
    // tslint:disable-next-line: variable-name
    constructor(private http: HttpClient, private dialog: MatDialog, private _bottomSheet: MatBottomSheet) {  }

    Generateroundrobinlist(valueitem) {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetSpecificRoundRobinEntry?contentid=' +
                             this.contentid + '&Xraiditem=' + valueitem.raiditemname).subscribe(result => {

           this.raiditems.push({ contentid: valueitem.contentid,
                                 hasroundrobin: valueitem.hasroundrobin,
                                 id: valueitem.id,
                                 raiditemimg: valueitem.raiditemimg,
                                 raiditemname: valueitem.raiditemname,
                                 items: result.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1)});

         }, error => console.error(error));
    }

    filteredRaiditems(rrl) {
        return rrl.filter(x => x.hasroundrobin === true);
    }
    openDialog(sitem) {

        this.dialog.open(TooltipComponent, {
          data: { item: sitem }}
        );

    }
    openBottomSheet(lodestoneid, raidername, raiditemname, raiditeminfoid): void {
         // console.log(this.raiditems);
         if (this.raiderIdentity.IsAdmin() === true) {
            // tslint:disable-next-line: max-line-length
            const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent, {data: { raiditeminfoid, raiditemname, raidername, contentid: this.raidcontent.id }});
            bottomSheetRef.afterDismissed().subscribe(() => {
               // console.log('Bottom sheet has been dismissed.');
                this.ngOnChanges();
            });
        } else {
            this._bottomSheet.open(BottomSheetComponent, {data: { lodestoneid }});
        }
    }


      
    closeDialog() { this.dialog.closeAll(); }
}
