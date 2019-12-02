import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-add-raiditem-drop',
    templateUrl: './add-raiditem-drop.component.html',
    styleUrls: ['./add-raiditem-drop.component.scss']
  })

  export class AddRaidItemDropComponent {

    override = false;
    receiveddate = new Date();
    raidcontentname: string;
    raidername: string;

    arrraidcontentname: any[];
    arrraidcontentitem: any[];
    arrraiders: any[];

    // tslint:disable-next-line: variable-name
    constructor(private http: HttpClient, private _SnackBar: MatSnackBar) {
      this.GetRaidContent();
    }

    toggleRaidcontentitem() { }
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

    toggleRaidcontentname(id) {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.arrraidcontentitem = [];
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentid=' + id).subscribe(result => {
        result[0]._RaidItems.forEach((val) => {
          console.log(val);
          this.arrraidcontentitem.push({value: val.id, viewValue: val.raiditemname});
        });
        console.log(this.arrraidcontentitem);
      }, error => console.error(error));
    }
  }
