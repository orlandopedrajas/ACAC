import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lan-mantear',
  templateUrl: './lan-mantear.component.html',
  styleUrls: ['./lan-mantear.component.css']
})

export class LanMantearComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  SavageItems: any[];
  photo = 'assets/img/no-profile.png';
  banner = '';
  activeclass = '';

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=Lan Mantear').subscribe(result => {
      this.SavageItems = result;
    }, error => console.error(error));

    // tslint:disable-next-line: deprecation
    http.get<any[]>(baseUrl + 'api/ACAC/GetAllProfiles').subscribe(result => {
      if (result) {
         result.forEach((value) => {
             if (value.raidername === 'Lan Mantear') {
              this.photo = value.raiderimg;
              // this.banner = value.raiderbanner;
             }
         });
      }
    }, error => console.error(error));

    http.get<any[]>('https://xivapi.com/character/9401374').subscribe(result => {
     console.log(result.Character.ActiveClassJob);
      this.banner = result.Character.Portrait;
     // this.activeclass = result.Character.ActiveClassJob.Name.toUpper();
    }, error => console.error(error));
  }
}

