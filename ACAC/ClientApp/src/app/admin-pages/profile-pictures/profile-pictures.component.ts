import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-pictures',
  templateUrl: './profile-pictures.component.html'
})

export class ProfilePicturesComponent {

  raiderprofiles: { raidername: string, raiderimg: string, raiderbanner: string } [];

  constructor(private http: HttpClient) {
    http.get<{ raidername: string, raiderimg: string, raiderbanner }[]>('./api/ACAC/GetAllProfiles').subscribe(result => {
     if (result) {
         this.raiderprofiles = result;
     }
   }, error => console.error(error));

  }

  onSubmit() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.http.post('./api/ACAC/saveProfiles', JSON.stringify(this.raiderprofiles), {headers: header}).subscribe(
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
