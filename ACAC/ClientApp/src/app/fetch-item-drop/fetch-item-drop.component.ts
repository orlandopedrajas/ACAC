import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-item-drop',
  templateUrl: './fetch-item-drop.component.html'
})

export class FetchItemDropComponent {
  public SavageItems: SavageItem[];
  public EquipmentItems: EquipmentItem[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
     http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/xItemDrops').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));

     http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xEquipmentDrops').subscribe(result => {
     this.EquipmentItems = result;
    }, error => console.error(error));
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

interface EquipmentItem {
  name: string;
  receivedDate: string;
}
