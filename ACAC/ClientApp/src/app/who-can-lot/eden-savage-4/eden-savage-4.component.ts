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

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor4_Equipment').subscribe(result => {
      this.Floor4_Equipments = result;
    }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor4_WeaponCoffer').subscribe(result => {
      this.Floor4_WeaponCoffers = result;
    }, error => console.error(error));
  }
}

interface EquipmentItem {
  raider: string;
}
