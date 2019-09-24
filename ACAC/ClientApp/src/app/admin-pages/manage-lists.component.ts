import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.css']
})

export class ManageListsComponent {

  raiders = ['Lan Mantear', 'Hades Carmine', 'Yumi Rin', 'Aerilyn Elessedil', 'Shelly Duncan', 'Thomas Silverstar', 'Val Phoenix', 'La Ki'];
  // tslint:disable-next-line: no-use-before-declare
  lo = new OverrideList();
  listtoclear = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

  }

  onClearFloor(lt: string, redirecto: string) {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.listtoclear = lt;
    this.http.post('./api/ItemDrop/ResetDb', JSON.stringify(this.listtoclear), {headers: header}).subscribe(
      (val) => { console.log('POST call successful value returned in body', val); },
      response => {
          console.log('POST call in error', response);
      },
      () => {
          console.log('The POST observable is now completed.');
      });
      window.location.href = './who-can-lot/' + redirecto;
  }

  onOverrideFloor(lt: string, redirecto: string) {
    this.lo.listtype = lt;
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.http.post('./api/ItemDrop/OverrideList', JSON.stringify(this.lo), {headers: header}).subscribe(
    (val) => { console.log('POST call successful value returned in body', val); },
    response => {
        console.log('POST call in error', response);
    },
    () => {
        console.log('The POST observable is now completed.');
    });
    window.location.href = './who-can-lot/' + redirecto;
  }

}

interface EquipmentItem {
  raider: string;
}
class OverrideList {
    listtype: string;
    raiders: string;
}
