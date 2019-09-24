import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-2',
  templateUrl: './eden-savage-2.component.html',
  styleUrls: ['./eden-savage-2.component.css']
})

export class EdenSavage2Component {
  Floor2_Equipments: EquipmentItem[];
  Floor2_EquipmentUpgrades: EquipmentItem[];
  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  floortoclear = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor2_Equipment').subscribe(result => {
      this.Floor2_Equipments = result;
    }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor2_EquipmentUpgrade').subscribe(result => {
      this.Floor2_EquipmentUpgrades = result;
    }, error => console.error(error));
  }

  onClearFloor2_equipment() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.floortoclear = 'Floor2_Equipment';
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

  onClearFloor2_equipmentupgrades() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.floortoclear = 'Floor2_EquipmentUpgrade';
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
