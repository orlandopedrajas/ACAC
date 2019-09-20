import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-item-drop',
  templateUrl: './add-item-drop.component.html',
  styleUrls: ['./add-item-drop.component.css']
})

export class AddItemDropComponent {

  recs = ['', 'Yes'];
  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  floors = ['Eden Savage Floor 1', 'Eden Savage Floor 2', 'Eden Savage Floor 3', 'Eden Savage Floor 4'];

  // tslint:disable-next-line: no-use-before-declare
  public Si: SavageItem;
  submitted = false;

 constructor(private http: HttpClient) { }

  onSubmit() {
    this.submitted = true;
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log(JSON.stringify(this.Si));

    this.http.post('./api/ItemDrop/addDrop', JSON.stringify(this.Si)).subscribe(
      (val) => { console.log('POST call successful value returned in body', val); },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
     // onsole.log(JSON.stringify(this.Sic.name));
  }
}
interface SavageItem {
  id: string;
  dateFormatted: string;
  floor: string;
  name: string;
  equipment: string;
  equipmentupdate: string;
  tomestone: string;
  weapon: string;
  weaponupgrade: string;
}

