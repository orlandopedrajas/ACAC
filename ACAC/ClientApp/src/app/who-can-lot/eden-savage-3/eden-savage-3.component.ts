import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-3',
  templateUrl: './eden-savage-3.component.html',
  styleUrls: ['./eden-savage-3.component.css']
})

export class EdenSavage3Component {
  Floor3_Equipments: EquipmentItem[];
  Floor3_EquipmentUpgrades: EquipmentItem[];
  Floor3_WeaponUpgrades: EquipmentItem[];
  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  floortoclear = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor3_Equipment').subscribe(result => {
      this.Floor3_Equipments = result;
    }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor3_EquipmentUpgrade').subscribe(result => {
      this.Floor3_EquipmentUpgrades = result;
      }, error => console.error(error));

     http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor3_WeaponUpgrade').subscribe(result => {
       this.Floor3_WeaponUpgrades = result;
     }, error => console.error(error));
  }

  onClearFloor3_Equipment() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.floortoclear = 'Floor3_Equipment';
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

  onClearFloor3_EquipmentUpgrade() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.floortoclear = 'Floor3_EquipmentUpgrade';
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

  onClearFloor3_WeaponUpgrade() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.floortoclear = 'Floor3_WeaponUpgrade';
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

interface SavageItem {
  dateReceived: string;
  floor: string;
  raider: string;
  droptype: string;
}

interface EquipmentItem {
  raider: string;
}
