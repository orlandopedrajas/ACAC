import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class Raiderprofiles {
  img: string;
  name: string;
}

@Component({
  selector: 'app-profile-pictures',
  templateUrl: './profile-pictures.component.html'
})

export class ProfilePicturesComponent {

  raiderprofiles: { img: string, name: string } [] = [
    { img: 'assets/img/no-profile.png', name: 'Aerilyn Elessedil' },
    { img: 'assets/img/no-profile.png', name: 'Hades Carmine' },
    { img: 'assets/img/no-profile.png', name: 'La Ki' },
    { img: 'assets/img/no-profile.png', name: 'Lan Mantear' },
    { img: 'assets/img/no-profile.png', name: 'Shelly Duncan' },
    { img: 'assets/img/no-profile.png', name: 'Thomas Silverstar' },
    { img: 'assets/img/no-profile.png', name: 'Val Phoenix' },
    { img: 'assets/img/no-profile.png', name: 'Yumi Rin' }
  ];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;

    http.get<{ img: string, name: string }[]>(baseUrl + 'api/ItemDrop/GetProfiles').subscribe(result => {
     // if (result) {
        // this.raiderprofiles = result;
     // }
   }, error => console.error(error));

  }

  onSubmit() {
    const headerJson = {'Content-Type': 'application/json'};
    const header = new HttpHeaders(headerJson);
    this.http.post('./api/ItemDrop/saveProfiles', JSON.stringify(this.raiderprofiles), {headers: header}).subscribe(
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
