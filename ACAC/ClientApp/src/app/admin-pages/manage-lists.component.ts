import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


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
  isAdmin: boolean;

  IsAdmin(): boolean {
  const discorduser = this.cookieService.get('discorduser');
  if (discorduser.length === 0) {
      this.cookieService.deleteAll();
      return false;
    } else {
       if (discorduser === 'Lan Mantear') { return true;
       } else { return false; }
    }
  }
  constructor(private http: HttpClient, private cookieService: CookieService) {

    if (!this.IsAdmin()) { window.location.href = '/'; }
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
