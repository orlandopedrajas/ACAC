import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class SavageItem {
  id: number;
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

export interface SavI {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

@Component({
  selector: 'app-add-item-drop',
  templateUrl: './add-item-drop.component.html',
  styleUrls: ['./add-item-drop.component.css']
})

export class AddItemDropComponent {

  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  floors = ['Eden Savage Floor 1', 'Eden Savage Floor 2', 'Eden Savage Floor 3', 'Eden Savage Floor 4'];
  // tslint:disable-next-line: max-line-length
  drops = ['Accessory Coffer', 'Chest Coffer', 'Deepshadow Coating', 'Deepshadow Twine', 'Deepshadow Solvent', 'Equipment Coffer', 'Lightweight Tomestone', 'Weapon Coffer'];
  submitanother = true;
  redirectto = '../';

  // tslint:disable-next-line: no-use-before-declare
  Si = new SavageItem();
  // tslint:disable-next-line: no-use-before-declare
  SavageItems: SavI[];
  submitted = false;
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype', 'id'];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;

    http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/GetRecentItemDrops').subscribe(result => {
     this.SavageItems = result;
   }, error => console.error(error));
  }

  onSubmit() {
    this.submitted = true;
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.Si.id = 0;
    this.http.post('./api/ItemDrop/addDrop', JSON.stringify(this.Si), {headers: header}).subscribe(
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
  toggleChange(event) {
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

    this.http.post('./api/ItemDrop/DeleteItemById', JSON.stringify(id), {headers: header}).subscribe(
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

