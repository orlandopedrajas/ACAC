import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-2',
  templateUrl: './eden-savage-2.component.html',
  styleUrls: ['./eden-savage-2.component.css']
})

export class EdenSavage2Component {
  Floor2_Equipments: EquipmentItem[];
  Floor2_EquipmentUpgrades: EquipmentItem[];
  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor2_Equipment').subscribe(result => {
      this.Floor2_Equipments = result;
    }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor2_EquipmentUpgrade').subscribe(result => {
      this.Floor2_EquipmentUpgrades = result;
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
