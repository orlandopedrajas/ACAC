import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-la-ki',
  templateUrl: './la-ki.component.html',
  styleUrls: ['./la-ki.component.css']
})

export class LaKiComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: any[];
  photo = 'assets/img/no-profile.png';
  banner = '';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=La Ki').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));

    // tslint:disable-next-line: deprecation
    http.get<any[]>(baseUrl + 'api/ACAC/GetAllProfiles').subscribe(result => {
      if (result) {
         result.forEach((value) => {
             if (value.raidername === 'La Ki') {
              this.photo = value.raiderimg;
              this.banner = value.raiderbanner;
             }
         });
      }
    }, error => console.error(error));
  }
}

