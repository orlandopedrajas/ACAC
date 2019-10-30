import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CookieService } from 'ngx-cookie-service';

export class SavageItem {
  id: number;
  Receiveddate: Date;
  Raidfloorname: string;
  raidername: string;
  raidItem: string;
}

export interface SavI {
  Receiveddate: Date;
  Raidfloorname: string;
  raidername: string;
  raidItem: string;
}

@Component({
  selector: 'app-add-item-drop',
  templateUrl: './add-item-drop.component.html',
  styleUrls: ['./add-item-drop.component.css']
})

export class AddItemDropComponent {

  raiders: any[];
  override = false;

  floors = [
    {value: 'Eden Savage Floor 1', viewValue: 'Eden Savage Floor 1'},
    {value: 'Eden Savage Floor 2', viewValue: 'Eden Savage Floor 2'},
    {value: 'Eden Savage Floor 3', viewValue: 'Eden Savage Floor 3'},
    {value: 'Eden Savage Floor 4', viewValue: 'Eden Savage Floor 4'}];
  drops = [  ];

  submitanother = true;
  redirectto = '../';

  // tslint:disable-next-line: no-use-before-declare
  Si = new SavageItem();
  // tslint:disable-next-line: no-use-before-declare
  SavageItems: any[];
  submitted = false;
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];
  isAdmin: boolean;

  IsAdmin(): boolean {
  const discorduser = this.cookieService.get('discorduser');
  if (discorduser.length === 0) {
      this.cookieService.deleteAll();
      return false;
    } else {
        if (discorduser === 'Lan Mantear') { return true;
        } else { return false; }
    }
  }

  // tslint:disable-next-line: variable-name
  constructor(private cookieService: CookieService, private http: HttpClient, private _SnackBar: MatSnackBar, public dialog: MatDialog) {
      this.isAdmin = this.IsAdmin();
      if (this.isAdmin) {
        this.Si.Receiveddate = new Date();
        this.getRecentRaidItems();
      } else { window.location.href = '/'; }
  }

  getRecentRaidItems() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC/GetRecentRaidItems').subscribe(result => {
     this.SavageItems = result;
   }, error => console.error(error));
  }

  toggleChangeFloor() {
    switch (this.Si.Raidfloorname) {
      case 'Eden Savage Floor 1': {
        this.drops = ['Accessory Coffer'];
        break;
      }
      case 'Eden Savage Floor 2': {
        this.drops = ['Deepshadow Coating', 'Equipment Coffer', 'Lightweight Tomestone'];
        break;
      }
      case 'Eden Savage Floor 3': {
        this.drops = ['Equipment Coffer', 'Deepshadow Twine', 'Deepshadow Solvent'];
        break;
      }
      case 'Eden Savage Floor 4': {
        this.drops = ['Chest Coffer', 'Weapon Coffer',
                      'Skyslipper Key', 'Book of Grace',
                      'Edengrace Tathlums', 'Edengrace Spear',
                      'Edengrace Shield', 'Edengrace Rod',
                      'Edengrace Revolver', 'Edengrace Rapier',
                      'Edengrace Manatrigger', 'Edengrace Planisphere',
                      'Edengrace Knuckles', 'Edengrace Knives',
                      'Edengrace Harp Bow', 'Edengrace Greatsword',
                      'Edengrace Cane', 'Edengrace Blade',
                      'Edengrace Battleaxe', 'Edengrace Bastard Sword',
                      'Word of Grace'];
        break;
      }
    }
  }

  raiditemchange() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC/GetRoundRobinList?XRaidfloorname=' + this.Si.Raidfloorname).subscribe(result => {
      if (this.override) {
        this.raiders = result.filter(r => r.raiditem === 'Other Items');
      } else {
        if (result.filter(r => r.raiditem === this.Si.raidItem).length === 0) {
          this.raiders = result.filter(r => r.raiditem === 'Other Items');
        } else {
          this.raiders = result.filter(r => r.raiditem === this.Si.raidItem);
        }
      }
     }, error => console.error(error));
  }

  raiderchange(event: any) {

    switch (this.Si.raidername) {
      case 'Aerilyn Elessedil':
        this.redirectto = './raiders/aerilyn-elessedil';
        break;
      case 'Hades Carmine':
          this.redirectto = './raiders/hades-carmine';
          break;
      case 'La Ki':
          this.redirectto = './raiders/la-ki';
          break;
      case 'Lan Mantear':
          this.redirectto = './raiders/lan-mantear';
          break;
      case 'Shelly Duncan':
          this.redirectto = './raiders/shelly-duncan';
          break;
      case 'Thomas Silverstar':
          this.redirectto = './raiders/thomas-silverstar';
          break;
      case 'Val Phoenix':
          this.redirectto = './raiders/val-phoenix';
          break;
      default:
        this.redirectto = '../';
        break;
    }
  }

  onSubmit() {
    if (!this.isAdmin) { window.location.href = '/'; }
    this.submitted = true;
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.Si.id = 0;
    this.http.post('./api/ACAC/addDrop', JSON.stringify(this.Si), {headers: header}).subscribe(
      (val) => { }, response => { }, () => { });
    if (!this.submitanother) {
        window.location.href = this.redirectto;
      } else {
        const snackBarRef = this._SnackBar.open(this.Si.raidItem + ' added for ' + this.Si.raidername, 'Done',
        { duration: 3000 });
        snackBarRef.afterDismissed().subscribe(() => {
          this.getRecentRaidItems();
          this.raiditemchange();
        });
      }
  }
  toggleChange(event) {
    if (event.checked) {
      this.submitanother = true;
    } else { this.submitanother = false; }
  }
  toggleOverrideChange(event) {
    if (event.checked) {
      this.override = true;
    } else { this.override = false; }
    this.raiditemchange();
  }
  OnRemoveItem(id: any) {
    if (!this.isAdmin) { window.location.href = '/'; }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the delete of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        this.http.post('./api/ACAC/DeleteItemById', JSON.stringify(id), {headers: header}).subscribe(
          (val) => {  }, response => { }, () => { this.getRecentRaidItems(); }
        );
      }
    });
  }
}
