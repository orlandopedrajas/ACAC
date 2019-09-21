import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-item-drop',
  templateUrl: './add-item-drop.component.html',
  styleUrls: ['./add-item-drop.component.css']
})

export class AddItemDropComponent {

  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  floors = ['Eden Savage Floor 1', 'Eden Savage Floor 2', 'Eden Savage Floor 3', 'Eden Savage Floor 4'];
  drops = ['Equipment Coffer', 'Equipment Upgrade', 'Weapon Coffer', 'Weapon Upgrade', 'Tomestone'];

  // tslint:disable-next-line: no-use-before-declare
  Si = new SavageItem;
  submitted = false;

 constructor(private http: HttpClient) { }

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
      window.location.href = '../fetch-item-drop';
  }
}
class SavageItem {
  id: number;
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}
