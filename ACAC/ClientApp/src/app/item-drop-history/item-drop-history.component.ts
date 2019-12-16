import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-drop-history',
  templateUrl: './item-drop-history.component.html',
  styleUrls: ['./item-drop-history.component.css']
})

export class ItemDropHistoryComponent {

  savageFloor = 'ALL';
  raidContent;

  constructor(private http: HttpClient) {
    this.getRaidContent();
  }

  getRaidContent() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentid=').subscribe(result => {
      this.raidContent = result.filter(r => r._raidContent.isenabled === true);
      console.log(this.raidContent);
    });
  }

  tabChanged(t) {
    switch (t.index) {
      case 0: {
        this.savageFloor = 'ALL';
        break;
      }
      case 1: {
        this.savageFloor = 'Eden Savage Floor 1';
        break;
      }
      case 2: {
        this.savageFloor = 'Eden Savage Floor 2';
        break;
      }
      case 3: {
        this.savageFloor = 'Eden Savage Floor 3';
        break;
      }
      case 4: {
        this.savageFloor = 'Eden Savage Floor 4';
        break;
      }
    }


  }
}
