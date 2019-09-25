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
