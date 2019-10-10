import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class Roundrobinreset {
  raidfloorname: string;
  raiditem: string;
  raiders: any[];
}

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html'
})

export class ManageListsComponent {

  raiderprofiles: any[];
  roundrobinlist = new Roundrobinreset();

  constructor(private http: HttpClient) {
    http.get<any[]>('./api/ACAC/GetAllProfiles').subscribe(result => {
     if (result) {
        this.raiderprofiles = result;
     }
   }, error => console.error(error));
  }

setlist($event, raidfloorname, raiditem) {
  this.roundrobinlist.raiders = $event;
  this.roundrobinlist.raidfloorname = raidfloorname;
  this.roundrobinlist.raiditem = raiditem;
}
  OnSubmit() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);

    this.http.post('./api/ACAC/RoundRobinReset', JSON.stringify(this.roundrobinlist), {headers: header}).subscribe(
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
