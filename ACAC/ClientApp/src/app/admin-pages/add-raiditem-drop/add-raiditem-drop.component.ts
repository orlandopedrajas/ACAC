import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RaiderIdentity, ThisRaider } from '../../components/ACACComponents';

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

    arrraidcontentname: any[];
    arrraidcontentitem: any[];
    arrraiders: any[];
    drops = '0';
    raiderIdentity: RaiderIdentity = new RaiderIdentity();

    // tslint:disable-next-line: no-use-before-declare
    Si = new SavageItem();

    // tslint:disable-next-line: variable-name
    constructor( private http: HttpClient, private _SnackBar: MatSnackBar) {

      if (this.raiderIdentity.IsAdmin() === true) {
        this.Si.receiveddate = new Date();
        this.GetRaidContent();
      } else { window.location.href = '/'; }
    }

    toggleRaidcontentitem() {

      this.arrraidcontentitem.forEach((val) => {
        if (val.viewValue === this.Si.raiditem) {
          this.Si.raiditeminfoid = val.value;
        }
      });
      this.retrieveValidRaiders();
    }
    retrieveValidRaiders() {
      let baseUrl;
      if (this.override) {
        baseUrl = document.getElementsByTagName('base')[0].href + 'api/ACAC2/GetRaiderProfiles';
        this.http.get<any[]>(baseUrl).subscribe(result => {
          this.arrraiders = result.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1);
        }, error => console.error(error));
      } else {
        console.log(this.Si.contentid);
        if (typeof this.Si.contentid !== 'undefined') {
          baseUrl = document.getElementsByTagName('base')[0].href + 'api/ACAC2/GetRoundRobinList?contentid=' + this.Si.contentid;
          this.http.get<any[]>(baseUrl).subscribe(result => {
            this.arrraiders = [];
            result.filter(r => r.raiditem === this.Si.raiditem).sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
              this.arrraiders.push({ raidername: value.raidername,
                                    raiderimg: value.raider.raiderimg
              });
            });
          }, error => console.error(error));
        } else { this.arrraiders = []; }
      }

    }

    toggleOverrideChange(event) {
      if (event.checked) {
        this.override = true;
      } else { this.override = false; }
      this.retrieveValidRaiders();
     }

    raiderchange() { }

    GetRaidContent() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.arrraidcontentname = [];
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent').subscribe(result => {
        result.filter(r => r._raidContent.isenabled === true).forEach((val) => {
          this.arrraidcontentname.push({value: val._raidContent.id, viewValue: val._raidContent.contentname});
        });
      }, error => console.error(error));
    }

    toggleRaidcontentname() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.arrraidcontentitem = [];
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentid=' + this.Si.contentid).subscribe(result => {
        result[0]._RaidItems.forEach((val) => {
          this.arrraidcontentitem.push({value: val.id, viewValue: val.raiditemname});
        });
      }, error => console.error(error));
    }

    onSubmit() {
      this.drops = '-1';
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);

      this.http.post('./api/ACAC2/AddRaidItemDrop', JSON.stringify(this.Si), {headers: header}).subscribe(
        (val) => {
           const snackBarRef = this._SnackBar.open(this.Si.raiditem + ' added for ' + this.Si.raidername, 'Done',
                                                   {duration: 3000 });
           snackBarRef.afterDismissed().subscribe(() => {
            this.toggleRaidcontentitem();
            this.drops = '0';
           });
        }, response => { console.log('POST call in error', response); }, () => { });
    }
  }
