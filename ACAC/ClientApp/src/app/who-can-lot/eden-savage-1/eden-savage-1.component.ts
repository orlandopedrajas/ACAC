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
  Floor1List = 'Floor1_Equipment';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<EquipmentItem[]>(baseUrl + 'api/ItemDrop/xFloor1_Equipment').subscribe(result => {
     this.Floor1_Equipments = result;
     }, error => console.error(error));
  }

  onClearFloor1_equipment() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);

    this.http.post('./api/ItemDrop/ResetDb', JSON.stringify(this.Floor1List), {headers: header}).subscribe(
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
