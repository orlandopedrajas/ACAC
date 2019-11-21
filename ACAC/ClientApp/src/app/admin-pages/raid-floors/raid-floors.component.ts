import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-raid-floors',
    templateUrl: './raid-floors.component.html',
    styleUrls: ['./raid-floors.component.css']
  })

  export class RaidFloorComponent implements OnInit {

    displayedColumns: string[] = ['raiditemimg', 'raiditemname', 'hasroundrobin'];
    contentname: string;
    contentdescription: string;
    contentimg: string;
    raidContent: any[];
    raiditemimg = '/assets/img/msq.png';
    raiditemname: string;
    hasroundrobin: false;

    // tslint:disable-next-line: variable-name
    constructor(private cookieService: CookieService, private http: HttpClient, private _SnackBar: MatSnackBar) {}
    ngOnInit() {
      this.getRaidContent();
    }

    onSubmit() {
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);
      console.log('contentimg 1: ' + this.contentimg);
      if (typeof this.contentimg === 'undefined') { this.contentimg = '/assets/img/msq.png'; }
      console.log('contentimg 2: ' + this.contentimg);
      this.http.post('./api/ACAC2/AddRaidContent',
                     JSON.stringify({contentname: this.contentname,
                                    contentdescription: this.contentdescription,
                                    contentimg: this.contentimg}),
                                    {headers: header}).subscribe(
        (val) => { }, response => { }, () => {
          const snackBarRef = this._SnackBar.open(this.contentname + ' added.', 'Done', { duration: 3000 });
          snackBarRef.afterDismissed().subscribe(() => { this.getRaidContent(); });
      });
    }

    getRaidContent() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentname=').subscribe(result => {
        console.log(result);

      });
    }

    setContentToUpdate($event) {

    }

    addRaidItem(content) {

      let idx1 = 0;
      this.raidContent.forEach((value) => {
        if (value.raidContent.contentname === content) {
          this.raidContent[idx1].item.push({raiditemimg: this.raiditemimg,
                                            raiditemname: this.raiditemname,
                                            hasroundrobin: this.hasroundrobin});
        }
        idx1 += 1;
      });

    }
  }
