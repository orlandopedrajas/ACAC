import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-item-drop',
  templateUrl: './fetch-item-drop.component.html',
  styleUrls: ['./fetch-item-drop.component.css']
})

export class FetchItemDropComponent {
  EquipmentItems: EquipmentItem[];
  EquipmentUpgradeItems: EquipmentItem[];
  WeaponItems: EquipmentItem[];
  WeaponUpgradeItems: EquipmentItem[];

  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
     http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xEquipmentDrops').subscribe(result => {
     this.EquipmentItems = result;
     }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xEquipmentUpgradeDrops').subscribe(result => {
      this.EquipmentUpgradeItems = result;
    }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xWeaponDrops').subscribe(result => {
      this.WeaponItems = result;
    }, error => console.error(error));

    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xWeaponUpgradeDrops').subscribe(result => {
      this.WeaponUpgradeItems = result;
    }, error => console.error(error));

  }

  // onSubmit() {
  //  this.http.post('./api/ItemDrop/ResetDb', null).subscribe(
  //    (val) => { console.log('POST call successful value returned in body', val); },
  //    response => {
  //      console.log('POST call in error', response);
  //    },
  //    () => {
  //      console.log('The POST observable is now completed.');
  //    });
  //  window.location.href = '../fetch-item-drop';
  // }

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
