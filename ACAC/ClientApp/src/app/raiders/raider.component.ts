import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raider',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})
export class RaiderComponent implements OnInit {
  raider: any[];
  raidername: string;
  routeparam = '';
  selected = 0;
  tabChanged(event) {
    this.raidername = this.raider[event.index].raidername;
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.routeparam =  params.raidername;
    });
    this.GetRaiders();
  }

  GetRaiders() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
      this.raider = result.filter(r => r.israidmember === true);
      let n = 0;
      if (this.routeparam !== '') {
        this.raider.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
          if (this.routeparam === value.raidername) {
              this.selected = n;
              this.raidername = this.routeparam;
          }
          n += 1;
        });
        this.routeparam = '';
      }
    });
  }

}
