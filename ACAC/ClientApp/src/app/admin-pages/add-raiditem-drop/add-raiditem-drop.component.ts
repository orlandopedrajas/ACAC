import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { CookieService } from 'ngx-cookie-service';

export class SavageItem {
  id: number;
  receiveddate: Date;
  raidername: string;
  contentid: number;
  raiditeminfoid: number;
  raiditem: string;
}

@Component({
    selector: 'app-add-raiditem-drop',
    templateUrl: './add-raiditem-drop.component.html',
    styleUrls: ['./add-raiditem-drop.component.scss']
  })

  export class AddRaidItemDropComponent {

    override = false;
    raidcontentname: string;

    arrraidcontentname: any[];
    arrraidcontentitem: any[];
    arrraiders: any[];

    // tslint:disable-next-line: no-use-before-declare
    Si = new SavageItem();

    // tslint:disable-next-line: variable-name
    constructor(private http: HttpClient, private _SnackBar: MatSnackBar) {
      this.Si.receiveddate = new Date();
      this.GetRaidContent();
    }

    toggleRaidcontentitem() {

      this.arrraidcontentitem.forEach((val) => {
        if (val.viewValue === this.Si.raiditem) {
          this.Si.raiditeminfoid = val.value;
        }
      });

      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRoundRobinList?contentid=' + this.Si.contentid).subscribe(result => {
        this.arrraiders = result.filter(r => r.raiditem === this.Si.raiditem).sort((a, b) => (a.raidername > b.raidername) ? 1 : -1);
        // console.log(this.arrraiders);
      }, error => console.error(error));
    }

    toggleChange(event) { }
    toggleOverrideChange(event) { }
    raiderchange() { }

    GetRaidContent() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.arrraidcontentname = [];
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent').subscribe(result => {
        result.forEach((val) => {
          this.arrraidcontentname.push({value: val._raidContent.id, viewValue: val._raidContent.contentname});
        });
      }, error => console.error(error));
    }

    toggleRaidcontentname() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.arrraidcontentitem = [];
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentid=' + this.Si.contentid).subscribe(result => {
        result[0]._RaidItems.forEach((val) => {
          // console.log(val);
          this.arrraidcontentitem.push({value: val.id, viewValue: val.raiditemname});
        });
       //  console.log(this.arrraidcontentitem);
      }, error => console.error(error));
    }

    onSubmit() {
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);

      this.http.post('./api/ACAC2/AddRaidItemDrop', JSON.stringify(this.Si), {headers: header}).subscribe(
        (val) => {
           const snackBarRef = this._SnackBar.open(this.Si.raiditem + ' added for ' + this.Si.raidername, 'Done',
                                                   {duration: 3000 });
           snackBarRef.afterDismissed().subscribe(() => {
            this.toggleRaidcontentitem();
           });
        }, response => { console.log('POST call in error', response); }, () => { });
      console.log(this.Si);
    }
  }
