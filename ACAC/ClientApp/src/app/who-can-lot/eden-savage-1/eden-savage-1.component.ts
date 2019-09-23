import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-1',
  templateUrl: './eden-savage-1.component.html',
  styleUrls: ['./eden-savage-1.component.css']
})

export class EdenSavage1Component {
  Floor1_Equipments: EquipmentItem[];
  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  res: object;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor1_Equipment').subscribe(result => {
     this.Floor1_Equipments = result;
     }, error => console.error(error));
  }

  onClearFloor1_equipment(@Inject('Base_URL') baseUrl: string) {
    this.http.get(baseUrl + 'api/ItemDrop/ResetDb?xResetDb=Floor1_Equipment').subscribe(result => {
      this.res = result;
      }, error => console.error(error));
    }

  // window.location.href = '../eden-savage-1';
}

interface EquipmentItem {
  raider: string;
}
