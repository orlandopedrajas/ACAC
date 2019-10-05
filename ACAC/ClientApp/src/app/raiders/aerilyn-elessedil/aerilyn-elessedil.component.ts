import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aerilyn-elessedil',
  templateUrl: './aerilyn-elessedil.component.html',
  styleUrls: ['./aerilyn-elessedil.component.css']
})

export class AerilynElessedilComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: any[];
  photo = 'assets/img/no-profile.png';
  banner = '';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=Aerilyn Elessedil').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));

    // tslint:disable-next-line: deprecation
    http.get<any[]>(baseUrl + 'api/ACAC/GetAllProfiles').subscribe(result => {
      if (result) {
         result.forEach((value) => {
             if (value.raidername === 'Aerilyn Elessedil') {
              this.photo = value.raiderimg;
              this.banner = value.raiderbanner;
             }
         });
      }
    }, error => console.error(error));
  }
}
