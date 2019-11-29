import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class ACACRaider {
  raider: any[];
  selected: string;
  constructor(Selected: string) { this.selected = Selected; }
}

@Component({
  selector: 'app-raider',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})
export class RaiderComponent implements OnInit {
  // raider = new ACACRaider('0');
  raider: any[];
  selected = 0;
  tabChanged(event) {
    this.selected = event.index;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetRaiders();
    // console.log(this.raider);
  }

  GetRaiders() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
      this.raider = result.filter(r => r.israidmember === true);
    });
  }

}
