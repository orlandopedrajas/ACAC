import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-4',
  templateUrl: './eden-savage-4.component.html',
  styleUrls: ['./eden-savage-4.component.css']
})

export class EdenSavage4Component {
  Floor4_Equipments: EquipmentItem[];
  Floor4_WeaponCoffers: EquipmentItem[];
  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  floortoclear = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor4_Equipment').subscribe(result => {
      this.Floor4_Equipments = result;
    }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor4_WeaponCoffer').subscribe(result => {
      this.Floor4_WeaponCoffers = result;
    }, error => console.error(error));
  }

  onClearFloor4_Equipment() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.floortoclear = 'Floor4_Equipment';
    this.http.post('./api/ItemDrop/ResetDb', JSON.stringify(this.floortoclear), {headers: header}).subscribe(
      (val) => { console.log('POST call successful value returned in body', val); },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
      window.location.reload();
  }

  onClearFloor4_WeaponCoffer() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.floortoclear = 'Floor4_WeaponCoffer';
    this.http.post('./api/ItemDrop/ResetDb', JSON.stringify(this.floortoclear), {headers: header}).subscribe(
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

interface EquipmentItem {
  raider: string;
}
