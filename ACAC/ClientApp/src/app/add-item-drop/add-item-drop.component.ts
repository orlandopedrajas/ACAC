import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  raiders = ['Aerilyn Elessedil', 'Hades Carmine', 'La Ki', 'Lan Mantear', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'Yumi Rin'];
  floors = [
    {value: 'Eden Savage Floor 1', viewValue: 'Eden Savage Floor 1'},
    {value: 'Eden Savage Floor 2', viewValue: 'Eden Savage Floor 2'},
    {value: 'Eden Savage Floor 3', viewValue: 'Eden Savage Floor 3'},
    {value: 'Eden Savage Floor 4', viewValue: 'Eden Savage Floor 4'}];
  drops = [  ];
  // tslint:disable-next-line: max-line-length
  // drops = ['Accessory Coffer', 'Chest Coffer', 'Deepshadow Coating', 'Deepshadow Twine', 'Deepshadow Solvent', 'Equipment Coffer', 'Lightweight Tomestone', 'Weapon Coffer'];
  submitanother = true;
  redirectto = '../';

  // tslint:disable-next-line: no-use-before-declare
  Si = new SavageItem();
  // tslint:disable-next-line: no-use-before-declare
  SavageItems: any[];
  submitted = false;
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;

    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems').subscribe(result => {
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
        this.drops = ['Chest Coffer', 'Weapon Coffer'];
        break;
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.Si.id = 0;
    this.http.post('./api/ACAC/addDrop', JSON.stringify(this.Si), {headers: header}).subscribe(
      (val) => { console.log('POST call successful value returned in body', val); },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
    if (!this.submitanother) {
        window.location.href = this.redirectto;
      } else {
        window.location.reload();
      }
  }
  toggleChange(option, event) {
    console.log(event);
    if (event.target.checked) {
      this.submitanother = true;
    } else { this.submitanother = false; }
  }

  raiderchange(event: any) {
    switch (event.target.value) {
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
  OnRemoveItem(id: any) {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);

    this.http.post('./api/ACAC/DeleteItemById', JSON.stringify(id), {headers: header}).subscribe(
      (val) => { console.log('POST call successful value returned in body', val); },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
    window.location.reload();
  }
}

