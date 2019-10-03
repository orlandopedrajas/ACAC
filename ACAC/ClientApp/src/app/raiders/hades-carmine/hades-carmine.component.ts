import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hades-carmine',
  templateUrl: './hades-carmine.component.html',
  styleUrls: ['./hades-carmine.component.css']
})

export class HadesCarmineComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: any[];
  photo = 'assets/img/no-profile.png';
  banner = '';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=Hades Carmine').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));

    // tslint:disable-next-line: deprecation
    http.get<any[]>(baseUrl + 'api/ACAC/GetAllProfiles').subscribe(result => {
      if (result) {
         result.forEach((value) => {
             if (value.raidername === 'Hades Carmine') {
              this.photo = value.raiderimg;
              this.banner = value.raiderbanner;
             }
         });
      }
    }, error => console.error(error));
  }
}
