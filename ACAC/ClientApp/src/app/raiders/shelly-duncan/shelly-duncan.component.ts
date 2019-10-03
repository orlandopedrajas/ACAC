import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shelly-duncan',
  templateUrl: './shelly-duncan.component.html',
  styleUrls: ['./shelly-duncan.component.css']
})

export class ShellyDuncanComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: any[];
  photo = 'assets/img/no-profile.png';
  banner = '';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=Shelly Duncan').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));

    // tslint:disable-next-line: deprecation
    http.get<any[]>(baseUrl + 'api/ACAC/GetAllProfiles').subscribe(result => {
      if (result) {
         result.forEach((value) => {
             if (value.raidername === 'Shelly Duncan') {
              this.photo = value.raiderimg;
              this.banner = value.raiderbanner;
             }
         });
      }
    }, error => console.error(error));
  }
}
