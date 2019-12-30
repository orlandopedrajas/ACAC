import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-drop-history',
  templateUrl: './item-drop-history.component.html',
  styleUrls: ['./item-drop-history.component.css']
})

export class ItemDropHistoryComponent {

  savageFloor = 'ALL';
  contentid = 'ALL';
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
    this.contentid =  t.tab.textLabel;
    if (this.contentid === '') { this.contentid = 'ALL'; }
  }
}
