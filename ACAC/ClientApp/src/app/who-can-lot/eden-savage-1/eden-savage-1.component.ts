import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-eden-savage-1',
  templateUrl: './eden-savage-1.component.html',
  styleUrls: ['./eden-savage-1.component.css']
})

export class EdenSavage1Component {

  Floor1_Equipments: EquipmentItem[];
  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  res: object;

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor1_Equipment').subscribe(result => {
     this.Floor1_Equipments = result;
     }, error => console.error(error));
  }

}

interface EquipmentItem {
  raider: string;
}
